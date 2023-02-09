const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const options = {};
      if (args.author) options.author = args.author;
      if (args.genre) options.genres = args.genre;

      return Book.find(options).populate('author');
    },
    favouriteBooks: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      return Book.find({ genres: currentUser.favouriteGenre }).populate(
        'author'
      );
    },
    uniqueGenres: async () => {
      const uniqueGenres = new Set();
      const allBooks = await Book.find({});
      allBooks.map((book) =>
        book.genres.map((genre) => uniqueGenres.add(genre))
      );
      return Array.from(uniqueGenres);
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { author: authorName, ...authorArgs } = args;
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      let author = await Author.findOne({ name: authorName });
      if (!author) {
        author = new Author({ name: authorName });
      }

      const book = new Book({ ...authorArgs, author });

      try {
        await author.save();
        await book.save();
        await book.populate('author');

        pubsub.publish('BOOK_ADDED', { bookAdded: book });
      } catch (error) {
        throw new GraphQLError('Saving new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      const authorToEdit = await Author.findOne({ name: args.name });

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      if (!authorToEdit) return null;

      try {
        authorToEdit.born = args.setBornTo;
        await authorToEdit.save();
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

      return authorToEdit;
    },
    createUser: async (root, args) => {
      const { username, favouriteGenre } = args;
      const user = new User({ username, favouriteGenre });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
  Author: {
    // not yet setup for mongoose
    bookCount: (root) =>
      books.reduce(
        (acc, book) => (book.author === root.name ? acc + 1 : acc),
        0
      ),
    // bookCount: async (root) => Book.collection.countDocuments({ author: root.id })
  },
};

module.exports = resolvers;
