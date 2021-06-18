'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getRecipes = require('./getRecipes');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get('/recipes', getRecipes);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
