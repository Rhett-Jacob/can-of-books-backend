'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const Book = require('./modules/books');

//create a new Book and save it to DB
async function seed() {
    const book1 = new Book({
        title: 'The farmer goes north',
        description: 'After running out of good soil, a farmer has to make a decision to leave his village or risk starvation.',
        status: '3 years old',
        email:'rhettbeardemphl@gmail.com'
    })

    await book1.save()
        .then(() => console.log('Saved book to the DB.'))
        .catch((error) => console.error(error));

    // alternate way to create a Book and save it to DB
    await Book.create({
        title: 'The farmer goes east',
        description: 'After running out of good soil again, a farmer has to make a decision to leave his village or risk starvation.',
        status: '2 years old',
        email:'rhettbeardemphl@gmail.com'
    })
        .then(() => console.log('Saved book to the DB.'))
        .catch((err) => console.error(err));

    await Book.create({
        title: 'The farmer goes south',
        description: 'After running out of good soil for a third time, a farmer has to make a decision to leave his village or risk starvation.',
        status: '1 year old',
        email:'rhettbeardemphl@gmail.com'
    })
        .then(() => console.log('Saved book to the DB.'))
        .catch((err) => console.error(err));

    mongoose.disconnect();
}

seed();