"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const Books = require("./model/books.js");
const booksHandler = require("./modules/booksHandler.js");
const ApiError = require("./error/ApiError.js");

//import global variables
const PORT = process.env.PORT;

//create server, specify allowed request origins, and data format
const app = express();
app.use(cors());
app.use(express.json());

//connect to mongodb atlas and verify connect is working
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Mongoose is connected"));

//setup route handlers
app.get("/", booksHandler.defaultBooksRoute);

app.get("/books", booksHandler.getAllBooks);

app.post("/books", booksHandler.postBook);

app.delete("/books/:id", booksHandler.deleteBook);

//handle errors
app.use((err, req, res, next) => {
  if(err instanceof ApiError){
    res.status(err.code).json(err.message);}
  res.status(500).json("Server Error");
});

//server listens to given domain and port
app.listen(PORT, () => console.log(`listening on ${PORT}`));
