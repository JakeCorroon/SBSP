const express = require('express');
const Handlebars = require('handlebars');
const { getView } = require('../views');

const router = express.Router();

router.get('/', async (req, res) => {
  const template = await getView('generic');
  const view = Handlebars.compile(template)();
  res.status(200).send(view);
});

module.exports = router;
