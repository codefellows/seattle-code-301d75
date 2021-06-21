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
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('hello');
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
