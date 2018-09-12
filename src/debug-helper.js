
import logger from './logger.js';

export default {
  displayResult: (displayName, sourcePath) => {
    logger.info(`Using file: ${displayName}        [${sourcePath}]`);
    logger.info(' ');
  },

  showArguments: (config, keyToUse) => {
    try {
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
    } catch (exception) {
      logger.error('Could not display arguments and configuration.');
      logger.error(exception);
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
    logger.info(`Root:        [${root}]`);
    logger.info('Destination');
    logger.info(`     path:   [${destinationPath}]`);
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