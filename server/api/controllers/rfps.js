const express = require('express');
const Handlebars = require('handlebars');
const { getView } = require('../views');
const { getRfps } = require('../../thirdParty/quickbase');
const { orderDataByFields } = require('../../utils/quickbase');

const router = express.Router();

router.get('/', async (req, res) => {
  const rfps = await getRfps();

  const template = await getView('rfps');
  const view = Handlebars.compile(template)(orderDataByFields(rfps));

  res.status(200).send(view);
});

module.exports = router;
