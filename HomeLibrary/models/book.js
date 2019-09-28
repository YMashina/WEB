let mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  submitter:{
    type: String,
    required: false
  },
  description:{
    type: String,
    required: true
  },
  available:{
    type: Boolean,
    required: true
  },
  duedate:{
    type: String,
    required: false
  },
  borrower:{
    type: String,
    required: false
  }

});

let Book = module.exports = mongoose.model('books', bookSchema);
//export {Book};
