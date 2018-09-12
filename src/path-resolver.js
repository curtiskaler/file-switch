
import path from 'path';
import logger from './logger.js';

export default {
  resolvePath: (debug, ...pathParts) => {
    let result = path.resolve(...pathParts);

    if (debug) {
      logger.info(`   resolved: [${result}]`);
      logger.info(' ');
    }

    return result;
  }
};