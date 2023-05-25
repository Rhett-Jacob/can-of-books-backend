"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const Books = require("./Model/books");
// const bookHandler = require('./Modules/bookHandler');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
// because mongoose is getting a Promise back from MongoDB we could also attach a .then and .catch to fire off a function or error on init
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Mongoose is connected"));

app.get("/", (request, response) => {
  response.status(200).send("default route working");
});

app.get("/books", async (request, response) => {
  try {
    const books = await Books.find();
    response.status(200).json({ data: books });
  } catch (err) {
    console.error(err);
    response.status(404).send(err);
  }
});

app.post("/books", (request, response) => {
  const data = request.body;
  console.log(data);

  Books.create(data)
    .then((res) => {
      response.status(201).json(res);
    })
    .catch((err) => {
      response.status(501).send(err);
    });
});

app.delete("/books/:id", (request, response) => {
  let id = request.params.id;
  Books.findByIdAndDelete(id)
    .then((deletedBook) => response.status(200).send(deletedBook))
    .catch((err) => response.status(404).send(err));
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// app.post('/books', async (req, res) => {
//   try{
//     const newBook = await Books.create(req.body);
//     res.status(201).json(newBook);
//   } catch(err){
//     console.error(err);
//     res.status(500).json(err);
//   }
// })
