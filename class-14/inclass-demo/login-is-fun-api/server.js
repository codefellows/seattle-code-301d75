const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

// EXCITING NEW CONFIG STEP
// this will let us access the request body in our POST requests
app.use(express.json());

let catHandlers = require('./catHandlers');

// database stuff

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// database error warnings from the quickstart guide
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('successfully connected to mongo');
});

// const Kitten = require('./models/Kitten');

// Commenting this out so that we don't create useless cats every time we stop & restart the server.
// // use the constructor to make an instance
// let myCoolCat = new Kitten({
//   name: 'Mr Mittens',
//   color: 'gray',
//   email: 'michelle@codefellows.com'
// });

// // actually save the cat data into MongoDB
// myCoolCat.save( (err, catDataFromMongo) => {
//   console.log('saved the cat');
//   console.log(catDataFromMongo);
// });

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('hello');
});

// test route: get all the cats
app.get('/allofthecats', catHandlers.allOfTheCats);

// actual route: get the cats that belong to one user
app.get('/cats', catHandlers.findCatsByEmail);

app.post('/cats', catHandlers.addCat);

app.put('/cats/:id', catHandlers.updateCat);

// the :id in the path means that that part of the URL is a parameter
app.delete('/cats/:id', catHandlers.deleteCat);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
