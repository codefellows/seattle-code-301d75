const mongoose = require('mongoose');
// set up the data model/template
const kittySchema = new mongoose.Schema({
  name: String,
  color: String,
  email: String
});

// create the class/constructor
const Kitten = mongoose.model('Kitten', kittySchema);

module.exports = Kitten;
