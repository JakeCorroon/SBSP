const jobsController = require('../api/controllers/jobs');
const rfpsController = require('../api/controllers/rfps');
const financeController = require('../api/controllers/finance');
const volunteersController = require('../api/controllers/volunteers');
const routes = [
  {
    route: 'jobs',
    router: jobsController,
  },
  {
    route: 'rfps',
    router: rfpsController,
  },
  {
    route: 'finance',
    router: financeController,
  },

  {
    route: 'volunteers',
    router: volunteersController,
  },
];

module.exports = routes;
