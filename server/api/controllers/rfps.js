const express = require('express');
const Handlebars = require('handlebars');
const { getView } = require('../views');
const { getRfps } = require('../../thirdParty/quickbase');
const { orderDataByFields } = require('../../utils/quickbase');

const router = express.Router();

router.get('/', async (req, res) => {
  const rfps = await getRfps();

  const template = await getView('rfps');

  const orderedData = orderDataByFields(rfps);

  //console.log(orderedData);

  console.log(JSON.stringify(orderedData, null, 2));

  const view = Handlebars.compile(template)(orderedData);

  res.status(200).send(view);
});

module.exports = router;
