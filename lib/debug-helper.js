
const logger = require('./logger.js');

module.exports = {
  displayResult: (displayName, sourcePath) => {
    logger.info(`Using file: ${displayName}        [${sourcePath}]`);
    logger.info(' ');
  },

  showArguments: (options, keyToUse) => {
    options = options || {};
    if (options.debug) {
      logger.info(' ');
      logger.info('***************************************************************************************');
      logger.info('Arguments:');
      logger.info('options:');
      logger.info(options);
      logger.info(' ');
      logger.info(`Key to use:  ['${keyToUse}']`);
      logger.info(' ');
    }
  },

  showSourceDetails: (root, sourcePath, displayName) => {
    logger.info(' ');
    logger.info('***************************************************************************************');
    logger.info(`       Root: [${root}]`);
    logger.info('Source');
    logger.info(`       Path: [${sourcePath}]`);
    logger.info(`displayName: [${displayName}]`);
    logger.info(' ');
  },

  showDestinationDetails: (root, destinationPath) => {
    logger.info(' ');
    logger.info('***************************************************************************************');
    logger.info(`       Root: [${root}]`);
    logger.info('Destination');
    logger.info(`       Path:  [${destinationPath}]`);
    logger.info(' ');
  },

  showResolved: (sourcePath, destinationPath) => {
    logger.info(' ');
    logger.info('***************************************************************************************');
    logger.info('Resolved');
    logger.info(`     source: [${sourcePath}]`);
    logger.info(`destination: [${destinationPath}]`);
    logger.info(' ');
  }
};