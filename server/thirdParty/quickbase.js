const { QuickBase } = require('quickbase');

function getClient() {
  return new QuickBase({
    realm: process.env.QUICKBASE_REALM,
    userToken: process.env.QUICKBASE_USER_API_KEY,
  });
}

const POSITION_FIELD_ID = 7;
const LEVEL_FIELD_ID = 8;

async function getJobs({ position, level } = {}) {
  const client = getClient();

  const statements = [];

  if (position) {
    statements.push(`{${POSITION_FIELD_ID}.CT.\'${position}\'}`);
  }

  if (level) {
    statements.push(`{${LEVEL_FIELD_ID}.EX.\'${level}\'}`);
  }

  const where = statements.join('AND');

  console.log('Where statement is: ', where);

  const report = await client.runQuery({
    tableId: process.env.QUICKBASE_JOBS_TABLE_ID,
    where,
  });
  return report;
}

async function getRfps() {
  const client = getClient();
  const report = await client.runQuery({ tableId: process.env.QUICKBASE_RFPS_TABLE_ID });
  return report;
}

async function getFinance() {
  const client = getClient();
  const report = await client.runQuery({ tableId: process.env.QUICKBASE_FINANCE_TABLE_ID });
  return report;
}

async function getVolunteers() {
  const client = getClient();
  const report = await client.runQuery({ tableId: process.env.QUICKBASE_VOLUNTEERS_TABLE_ID });
  return report;
}

module.exports = {
  getJobs,
  getRfps,
  getFinance,
  getVolunteers,
};
