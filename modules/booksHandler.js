"use strict";

const Books = require("./books");
// const ApiError = require("../error/ApiError.js");

let booksHandler = {};

booksHandler.defaultBooksRoute = (request, response, next) => {
  response.status(200).send("default route working");
};

booksHandler.getAllBooks = async (request, response, next) => {
  let queryObject  = {email: request.user.email}
  try {
    const books = await Books.find(queryObject);
    response.status(200).json({ data: books });
  } catch (err) {
    response.status(404).send(err);
  }
};

booksHandler.postBook = (request, response, next) => {
  const updatedObj = {...request.body, email:request.user.email}
  console.log('bookshandler hello');
  Books.create(updatedObj)
    .then((res) => {
      response.status(201).json(res);
    })
    .catch((err) => {
      response.status(501).send(err);
    });
};

booksHandler.updateBook = (request, response, next) => {
  console.log('hello we hit')
  const id = request.params.id;
  const data = {...request.body, email:request.user.email}
  console.log(data);

  Books.findByIdAndUpdate(id,data, {new:true, overwrite:true})
    .then((updatedBook) => {
      response.status(201).send(updatedBook);
    })
    .catch((err) => {
      response.status(501).send(err);
    });
};

booksHandler.deleteBook = (request, response, next) => {
  let id = request.params.id;
  Books.findByIdAndDelete(id)
    .then((deletedBook) => response.status(200).send(deletedBook))
    .catch((err) => response.status(404).send(err));
};

module.exports = booksHandler;
