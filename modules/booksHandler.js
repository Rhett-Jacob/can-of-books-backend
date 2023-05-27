"use strict";

const Books = require("../model/books.js");
// const ApiError = require("../error/ApiError.js");

let booksHandler = {};

booksHandler.defaultBooksRoute = (request, response, next) => {
  response.status(200).send("default route working");
};

booksHandler.getAllBooks = async (request, response, next) => {
  try {
    const books = await Books.find();
    response.status(200).json({ data: books });
  } catch (err) {
    next(ApiError)
    response.status(404).send(err);
  }
};

booksHandler.postBook = async (request, response, next) => {
  const data = request.body;
  console.log(data);

  Books.create(data)
    .then((res) => {
      response.status(201).json(res);
    })
    .catch((err) => {
      response.status(501).send(err);
    });
};

booksHandler.deleteBook = async (request, response, next) => {
  let id = request.params.id;
  Books.findByIdAndDelete(id)
    .then((deletedBook) => response.status(200).send(deletedBook))
    .catch((err) => response.status(404).send(err));
};

module.exports = booksHandler;
