const http = require('http');
const express = require('express');
const helmet = require('helmet');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "frame-src 'self' http://localhost:8000 https://sbsp-dashboards.herokuapp.com",
  );
  next();
});

app.use((req, res) => res.send(fs.readFileSync(path.join(__dirname, 'iframe.html'), 'utf8')));

http.createServer(app).listen(8080);
