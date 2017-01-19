const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongooseUri = require('./options').mongoUri;

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};

//setUp database and models
require('./database')(mongoose, mongooseUri);

//setUp models
require('./users').model(mongoose);

//setUp middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors(corsOptions));

//setUp auth with passport
require('./auth').init(app, mongooseUri);

//setUp user middleware like errorHandler
require('./middleware').init(app);

//setUp routes
require('./auth').route(app); // /login
require('./users').route(app); // /users

module.exports = app;
