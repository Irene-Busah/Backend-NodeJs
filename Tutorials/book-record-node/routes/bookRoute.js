const Book = require('../models/bookModel')
const express = require('express');
const { getBooks, getBook, createBook, updateBook, deleteBook } = require('../controller/bookController')

const router = express.Router();

router.post('/books', createBook)


router.get('/books', getBooks)

router.get('/books/:id', getBook)

router.put('/books/:id', updateBook)

router.delete('/books/:id', deleteBook)

module.exports = router;
