const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const cors = require('cors');
const routes = require('./routes');
const genericController = require('../api/controllers/generic');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', `Allow-From ${req.url}`);
  next();
});

routes.forEach(({ route, router }) => app.use(`/${route}`, router));

app.use('/', genericController);
app.use('/*', genericController);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.'),
);

module.exports = app;
