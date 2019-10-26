const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('./database');

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const app = express();

let log;

switch (process.env.NODE_ENV) {
  case 'development':
    log = 'dev';
    break;
  case 'test':
    log = 'dev';
    break;
  case 'staging':
    log = 'tiny';
    break;
  case 'production':
    log = 'common';
    break;
  default:
    throw new Error('NODE_ENV not found');
}

app.use(logger(log));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', registerRouter);
app.use('/api', loginRouter);

module.exports = app;
