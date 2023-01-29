const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    type: String,
  }],
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const { _id, __v, ...obj } = returnedObject;
    return { ...obj, id: _id.toString() };
  },
});

module.exports = mongoose.model('Blog', blogSchema);
