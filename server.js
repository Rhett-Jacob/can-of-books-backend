'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const Books = require('./Model/books');

const app = express();
app.use(cors());
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
// because mongoose is getting a Promise back from MongoDB we could also attach a .then and .catch to fire off a function or error on init
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=> console.log('Mongoose is connected'));

app.get('/', (request, response) => {
  response.status(200).send('default route working');
});

app.get('/books', async (request, response) => {
  try {
    const books = await Books.find();
    response.status(200).json({data: books});
  } catch(error){
    console.error(error);
    response.status(404).json({error: error.message});
  }
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
