const { QuickBase } = require('quickbase');
const moment = require('moment');

function getClient() {
  return new QuickBase({
    realm: process.env.QUICKBASE_REALM,
    userToken: process.env.QUICKBASE_USER_API_KEY,
  });
}
//constants for Jobs table:
const COMPANY_FIELD_ID = 6;
const STATE_FIELD_ID = 17;
const POSITION_FIELD_ID = 7;
const LEVEL_FIELD_ID = 8;
const INDUSTRY_FIELD_ID = 14;
const PUBLISH_FIELD_ID = 16;
const CITY_FIELD_ID = 18;
const DESCRIPTION_FIELD_ID = 12;
const DATE_POSTED_FIELD_ID = 9;
//constants for RFP table:
const RFPS_PUBLISH_FIELD_ID = 14;
const RFPS_TITLE_FIELD_ID = 13;
const RFPS_DESCRIPTION_FIELD_ID = 6;
const RFPS_CITY_FIELD_ID = 10;
const RFPS_STATE_FIELD_ID = 11;
const RFPS_EXPIRATION_FIELD_ID = 8;
//constants for Professionals table:
const PROFESSIONALS_PUBLISH_FIELD_ID = 19;
const PROFESSIONALS_FULLNAME_FIELD_ID = 22;
const PROFESSIONALS_CITY_FIELD_ID = 9;
const PROFESSIONALS_STATE_FIELD_ID = 10;
const PROFESSIONALS_TYPE_FIELD_ID = 13;
const PROFESSIONALS_YEARS_FIELD_ID = 11;
const PROFESSIONALS_SEEKING_FIELD_ID = 12;


async function getJobs({ company, position, level, state, city, industry, description, start, end } = {}) {
  const client = getClient();

  const statements = [`{${PUBLISH_FIELD_ID}.EX.${true}}`];
   
  if (company) {
    statements.push(`{${COMPANY_FIELD_ID}.CT.\'${company}\'}`);
  }

  if (state) {
    statements.push(`{${STATE_FIELD_ID}.CT.\'${state}\'}`);
  }

  if (city) {
    statements.push(`{${CITY_FIELD_ID}.CT.\'${city}\'}`);
  }

  if (position) {
    statements.push(`{${POSITION_FIELD_ID}.CT.\'${position}\'}`);
  }

  if (level) {
    statements.push(`{${LEVEL_FIELD_ID}.EX.\'${level}\'}`);
  }

  if (description) {
    statements.push(`{${DESCRIPTION_FIELD_ID}.CT.\'${description}\'}`);
  }

  if (industry) {
    statements.push(`{${INDUSTRY_FIELD_ID}.EX.\'${industry}\'}`);
  }

  if (start) {
    const asMoment = moment(start, 'YYYYMMDD')
    statements.push(`{${DATE_POSTED_FIELD_ID}.GTE.\'${asMoment.format('MM-DD-YYYY')}\'}`);
  }

  if (end) {
    const asMoment = moment(end, 'YYYYMMDD')
    statements.push(`{${DATE_POSTED_FIELD_ID}.LTE.\'${asMoment.format('MM-DD-YYYY')}\'}`);
  }

  const where = statements.join('AND');

  console.log('Where statement is: ', where);

  const report = await client.runQuery({
    tableId: process.env.QUICKBASE_JOBS_TABLE_ID,
    where,
  });
  return report;
} 

async function getRfps({ title,description, city, state, expiration  } = {}) {
  const client = getClient();
  
  const statements = [`{${RFPS_PUBLISH_FIELD_ID}.EX.${true}}`];

  if (title) {
    statements.push(`{${RFPS_TITLE_FIELD_ID}.CT.\'${title}\'}`);
  }

  if (description) {
    statements.push(`{${RFPS_DESCRIPTION_FIELD_ID}.CT.\'${description}\'}`);
  }

  if (city) {
    statements.push(`{${RFPS_CITY_FIELD_ID}.CT.\'${city}\'}`);
  }

  if (state) {
    statements.push(`{${RFPS_STATE_FIELD_ID}.CT.\'${state}\'}`);
  }

  if (expiration) {
    statements.push(`{${RFPS_EXPIRATION_FIELD_ID}.CT.\'${expiration}\'}`);
  }

  const where = statements.join('AND');

  console.log('Where statement is: ', where);
  const report = await client.runQuery({ 
    tableId: process.env.QUICKBASE_RFPS_TABLE_ID,
    where,
  });
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

async function getProfessionals({fullname, city, state, type, years, seeking } = {}) {
  const client = getClient();
  
  const statements = [`{${PROFESSIONALS_PUBLISH_FIELD_ID}.EX.${true}}`];

  if (fullname) {
   statements.push(`{${PROFESSIONALS_FULLNAME_FIELD_ID}.CT.\'${fullname}\'}`);
 }

 if (city) {
  statements.push(`{${PROFESSIONALS_CITY_FIELD_ID}.CT.\'${city}\'}`);
}

if (state) {
  statements.push(`{${PROFESSIONALS_STATE_FIELD_ID}.CT.\'${state}\'}`);
}

if (type) {
  statements.push(`{${PROFESSIONALS_TYPE_FIELD_ID}.CT.\'${type}\'}`);
}

if (years) {
  statements.push(`{${PROFESSIONALS_YEARS_FIELD_ID}.GTE.\'${years}\'}`);
}

if (seeking) {
  statements.push(`{${PROFESSIONALS_SEEKING_FIELD_ID}.GTE.\'${seeking}\'}`);
}



  const where = statements.join('AND');

  console.log('Where statement is: ', where);
  const report = await client.runQuery({ 
    tableId: process.env.QUICKBASE_PROFESSIONALS_TABLE_ID,
    where,
  });
  return report;
}

module.exports = {
  getJobs,
  getRfps,
  getFinance,
  getVolunteers,
  getProfessionals,
};
