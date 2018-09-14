
const logger = require('./logger.js');

module.exports = {
  displayResult: (displayName, sourcePath) => {
    logger.info(`Using file: ${displayName}        [${sourcePath}]`);
    logger.info(' ');
  },

  showArguments: (config, keyToUse) => {
    config = config || {};
    if (config.debug) {
      logger.info(' ');
      logger.info('***************************************************************************************');
      logger.info('Arguments:');
      logger.info('config:');
      logger.info(config);
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