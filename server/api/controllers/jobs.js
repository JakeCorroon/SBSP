const express = require('express');
const Handlebars = require('handlebars');
const { getView } = require('../views');
const { getJobs } = require('../../thirdParty/quickbase');
const { orderDataByFields } = require('../../utils/quickbase');

const router = express.Router();

router.get('/', async (req, res) => {
  const jobs = await getJobs();

  const template = await getView('jobs');
  const view = Handlebars.compile(template)(orderDataByFields(jobs));

  res.status(200).send(view);
});

module.exports = router;
