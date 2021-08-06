const { QuickBase } = require('quickbase');

function getClient() {
  return new QuickBase({
    realm: process.env.QUICKBASE_REALM,
    userToken: process.env.QUICKBASE_USER_API_KEY,
  });
}

async function getJobs() {
  const client = getClient();
  const report = await client.runQuery({ tableId: process.env.QUICKBASE_JOBS_TABLE_ID });
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
