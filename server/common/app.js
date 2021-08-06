const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const routes = require('./routes');
const genericController = require('../api/controllers/generic');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
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
