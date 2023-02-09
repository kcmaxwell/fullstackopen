const DataLoader = require('dataloader');
const Book = require('./models/book');

const loaders = {
  bookCountLoader: new DataLoader((authorIds) => {
    return Book.find({ author: { $in: authorIds } }).then((bookArray) => {
      return authorIds.map((authorId) =>
        bookArray.reduce(
          (acc, book) => (book.author.toString() === authorId ? acc + 1 : acc),
          0
        )
      );
    });
  }),
};

module.exports = loaders;
