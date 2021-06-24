const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/plants', {useNewUrlParser: true, useUnifiedTopology: true});


const plantSchema = new mongoose.Schema({
  habitat: String,
  height: Number
});

const Plant = mongoose.model('Plant', plantSchema);

app.get('/', (req, res) => {
  res.send('yo');
});

app.get('/plants', (req, res) => {
  Plant.find({}, (err, foundPlants) => {
    res.send(foundPlants);
  });
});

app.post('/plants', (req, res) => {
  let plant = new Plant({
    habitat: req.body.habitat,
    height: req.body.height
  });
  plant.save().then(savedPlant => {
    res.send(savedPlant);
  });
});

app.delete('/plants/:potato', (req, res) => {
  Plant.deleteOne({_id: req.params.potato}).then(() => {
    res.send('deleted');
  });
});

app.listen(3001, () => console.log('listening on 3001'));
