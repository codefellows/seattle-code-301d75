
const Kitten = require('./models/Kitten');
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

let allOfTheCats = (req, res) => {
  // go to mongodb
  // find all of the cats
  // send them to the user
  Kitten.find({}, (err, kittens) => {
    console.log(kittens);
    res.send(kittens);
  });
};

let findCatsByEmail = (req, res) => {
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
};

let addCat = (req, res) => {

  const token = req.headers.authorization.split(' ')[1];
  // make sure the token was valid
  jwt.verify(token, getKey, {}, function(err, user) {
    if(err) {
      res.status(500).send('invalid token');
    } else {
      // req.body ONLY exists because of that configuration line at the top of the file
      // app.use(express.json())
      // if you do not have that line, req.body will be undefined
      console.log(req.body);
      const newCat = new Kitten({
        name: req.body.name,
        color: req.body.color,
        // grab the email from the token
        email: user.email
      });
      newCat.save((err, savedCatData) => {
        res.send(savedCatData);
      });
    }
  });
};

let updateCat = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  // make sure the token was valid
  jwt.verify(token, getKey, {}, function(err, user) {
    if(err) {
      res.status(500).send('invalid token');
    } else {
      Kitten.findOne({_id: req.params.id, email: user.email}).then(foundKitten => {
        console.log(foundKitten);
        //update that kitten
        foundKitten.name = req.body.name;
        foundKitten.color = req.body.color;
        foundKitten.save()
          .then(savedKitten => res.send(savedKitten));
        // send back the updated data
      });
    }
  });
};

let deleteCat = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  // make sure the token was valid
  jwt.verify(token, getKey, {}, function(err, user) {
    if(err) {
      res.status(500).send('invalid token');
    } else {
      let catId = req.params.id;

      Kitten.deleteOne({_id: catId, email: user.email})
        .then(deletedCatData => {
          console.log(deletedCatData);
          res.send('success deleting the cat');
        });
    }
  });
};

module.exports = {
  allOfTheCats: allOfTheCats, findCatsByEmail, addCat, updateCat, deleteCat
};
