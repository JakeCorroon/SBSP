const jobsController = require('../api/controllers/jobs');

const routes = [
  {
    route: 'jobs',
    router: jobsController,
  },
];

module.exports = routes;
