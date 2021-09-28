const express = require('express');
const Handlebars = require('handlebars');
const { getView } = require('../views');
const { getJobs } = require('../../thirdParty/quickbase');
const { orderDataByFields } = require('../../utils/quickbase');

const router = express.Router();

router.get('/', async (req, res) => {
  const { query } = req;

  const jobs = await getJobs(query);

  const template = await getView('jobs');

  const orderedData = orderDataByFields(jobs);

  console.log(JSON.stringify(orderedData, null, 2));

  const view = Handlebars.compile(template)(orderedData);

  res.status(200).send(view);
});

module.exports = router;
