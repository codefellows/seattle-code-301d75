const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

// everything here is identical
// ------------------
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  // EXCEPT! This line comes from your auth0 dashboard, Advanced Settings, OAuth, the jwks one
  jwksUri: 'https://dev-q5ygvss9.us.auth0.com/.well-known/jwks.json'
});

// comes from jsonwebtoken documentation
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// ----------------------------------


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

const Kitten = require('./models/Kitten');

// Commenting this out so that we don't create useless cats every time we stop & restart the server.
// use the constructor to make an instance
let myCoolCat = new Kitten({
  name: 'Mr Mittens',
  color: 'gray',
  email: 'michelle@codefellows.com'
});

// actually save the cat data into MongoDB
myCoolCat.save( (err, catDataFromMongo) => {
  console.log('saved the cat');
  console.log(catDataFromMongo);
});

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('hello');
});

// test route: get all the cats
app.get('/allofthecats', (req, res) => {
  // go to mongodb
  // find all of the cats
  // send them to the user
  Kitten.find({}, (err, kittens) => {
    console.log(kittens);
    res.send(kittens);
  });
});

// actual route: get the cats that belong to one user
app.get('/cats', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  // make sure the token was valid
  jwt.verify(token, getKey, {}, function(err, user) {
    if(err) {
      res.status(500).send('invalid token');
    } else {
      // find the kittens that belong to the user with that email address
      let userEmail = user.email;
      Kitten.find({email: userEmail}, (err, kittens) => {
        console.log(kittens);
        res.send(kittens);
      });
    }
  });
});

app.get('/test-login', (req, res) => {
  // grab the token that was sent by the frontend
  const token = req.headers.authorization.split(' ')[1];
  // make sure the token was valid
  jwt.verify(token, getKey, {}, function(err, user) {
    if(err) {
      res.status(500).send('invalid token');
    } else {
      res.send(user);
    }
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
