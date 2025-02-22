const dotenv = require('dotenv');
dotenv.config();
const connect = require('./db/db');
connect();
const express = require('express');
const app = express();
const cookiePareser = require('cookie-parser');
const rideRouter = require('./routes/ride.router');
const rabbitMQ = require('./services/rabbit');
rabbitMQ.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiePareser());

app.use('/', rideRouter);

module.exports = app;
