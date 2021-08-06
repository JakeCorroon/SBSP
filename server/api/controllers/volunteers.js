const express = require('express');
const Handlebars = require('handlebars');
const { getView } = require('../views');
const { getVolunteers } = require('../../thirdParty/quickbase');
const { orderDataByFields } = require('../../utils/quickbase');

const router = express.Router();

router.get('/', async (req, res) => {
  const volunteers = await getVolunteers();

  const template = await getView('volunteers');
  const view = Handlebars.compile(template)(orderDataByFields(volunteers));

  res.status(200).send(view);
});

module.exports = router;
