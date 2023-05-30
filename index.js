const express = require('express');
const connection = require("./connection");
const bookRoute = require('./routes/books');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/books', bookRoute);

module.exports = app;