console.log('hello from node!');

// in our servers, we use require instead of import
const express = require('express');
const app = express();

// specify what routes our server should be listening for
app.get('/', (request, response) => {
  // when we get that request, send back a response
  response.send('hello from the server!');
});
app.get('/potato', (request, response) => {
  // when we get that request, send back a response
  response.send('potatoes are delicious');
});

// tell our server to start listening for requests
app.listen(3001, () => {console.log('listening on port 3001')});
