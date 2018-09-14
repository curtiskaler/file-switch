
const fs = require('fs');
const logger = require('./logger.js');

module.exports = {
  copyFile: (sourcePath, destinationPath) => {
    try {
      if (fs.existsSync(sourcePath)) {
        fs.copyFile(sourcePath, destinationPath);
      } else {
        logger.error(`file does not exist. [${sourcePath}]`);
      }
    } catch (exception) {
      logger.error(exception);
    }
  }
};
