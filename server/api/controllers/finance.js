const express = require('express');
const Handlebars = require('handlebars');
const { getView } = require('../views');
const { getFinance } = require('../../thirdParty/quickbase');
const { orderDataByFields } = require('../../utils/quickbase');

const router = express.Router();

router.get('/', async (req, res) => {
  const finance = await getFinance();

  const template = await getView('finance');
  const view = Handlebars.compile(template)(orderDataByFields(finance));

  res.status(200).send(view);
});

module.exports = router;
