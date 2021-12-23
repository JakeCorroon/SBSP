const jobsController = require('../api/controllers/jobs');
const rfpsController = require('../api/controllers/rfps');
const financeController = require('../api/controllers/finance');
const volunteersController = require('../api/controllers/volunteers');
const professionalsController = require('../api/controllers/professionals');
const routes = [
  {
    route: 'jobs',
    router: jobsController,
  },
  {
    route: 'professionals',
    router: professionalsController,
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
