const express = require('express');
const Handlebars = require('handlebars');
const { getView } = require('../views');
const { getProfessionals } = require('../../thirdParty/quickbase');
const { orderDataByFields } = require('../../utils/quickbase');

const router = express.Router();

router.get('/', async (req, res) => {
  const { query } = req;

  const professionals = await getProfessionals(query);

  const template = await getView('professionals');
  const view = Handlebars.compile(template)(orderDataByFields(professionals));

  res.status(200).send(view);
});

module.exports = router;
