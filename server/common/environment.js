const dotEnvExtended = require('dotenv-extended');
/* eslint-disable newline-after-import */
dotEnvExtended.load();
/* eslint-enable newline-after-import */
const checkEnv = require('checkenv');

try {
  checkEnv.check();
} catch (e) {
  console.error(`Environment check failed with ${e.toString()}`);
  throw e;
}
