const fs = require('fs-extra');
const path = require('path');

function getView(name) {
  return fs.readFile(path.join(__dirname, `${name}.hbs`), 'utf8');
}

module.exports = {
  getView,
};
