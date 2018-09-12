
import logger from './logger.js';
import debug from './debug-helper.js';
import resolver from './path-resolver.js';

export default {
  getSourcePath: (config, keyToUse) => {
    try {
      // read config
      let root = config.root || '.';
      let source = config.sources.find(item =>item.key.toLowerCase() === keyToUse.toLowerCase());

      let displayName = source.displayName || '';

      if (config.debug) {
        debug.showSourceDetails(config.debug, root, source.path, displayName);
      }

      // normalize paths
      let result = resolver.resolvePath(config.debug, __dirname, root, source.path);
      return [result, displayName];
    } catch (exception) {
      logger.error('Could not identify source file.');
      logger.error(exception);
      return null;
    }
  },

  getDestinationPath : (config) => {
    try {
      // read config
      let root = config.root || '.';
      let destination = config.destination;

      if (config.debug) {
        debug.showDestinationDetails(root, destination.path);
      }

      // normalize paths
      return resolver.resolvePath(config.debug, __dirname, root, destination.path);
    } catch (exception) {
      logger.error('Could not identify destination file.');
      logger.error(exception);
      return null;
    }
  }
};