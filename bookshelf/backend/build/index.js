"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
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
app.listen(3000, () => console.log('Server is working...'));
