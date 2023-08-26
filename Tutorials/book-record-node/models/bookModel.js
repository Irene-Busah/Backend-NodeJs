const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: [true, "Please enter the book name"]
    },
    author: {
        type: 'string',
        required: [true, 'Please enter the author name']
    },
    short_description: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: false
    }
})


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
