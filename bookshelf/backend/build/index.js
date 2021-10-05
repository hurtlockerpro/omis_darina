"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
let books = [
    {
        isbn: 'isbn1',
        title: 'title1',
        description: 'description1',
        author: 'author1',
        year: 2021
    },
    {
        isbn: 'isbn2',
        title: 'title2',
        description: 'description2',
        author: 'author2',
        year: 2022
    },
    {
        isbn: 'isbn3',
        title: 'title3',
        description: 'description3',
        author: 'author3',
        year: 2023
    },
];
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.get('/books', function (req, res) {
    res.send(books);
});
app.delete('/books/delete/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    console.log(isbn);
    books.forEach((book, index) => {
        if (book.isbn == isbn) {
            books.splice(index, 1);
        }
    });
    let requestResult = {
        status: 200,
        message: 'deleted successfully'
    };
    res.status(requestResult.status).send(requestResult);
});
app.post('/books/new', function (req, res) {
    let newBook = JSON.parse(req.body.formData);
    console.log(newBook);
    let book = {
        isbn: newBook.bookIsbn,
        title: newBook.bookTitle,
        description: newBook.bookDescription,
        author: newBook.bookAuthor,
        year: newBook.bookYear
    };
    books.push(book);
    res.status(200).send({ result: 'Success', book: book });
});
app.listen(3000, () => console.log('Server is working...'));
