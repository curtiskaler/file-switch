
const path = require('path');
const logger = require('./logger.js');

module.exports = {
  resolvePath: (debug, ...pathParts) => {
    let result = path.resolve(...pathParts);

    if (debug) {
      logger.info(`   resolved: [${result}]`);
      logger.info(' ');
    }

    return result;
  }
};
