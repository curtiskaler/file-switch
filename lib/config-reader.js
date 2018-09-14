
const logger = require('./logger.js');
const debug = require('./debug-helper.js');
const resolver = require('./path-resolver.js');

module.exports = {
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
      let absolutePath = resolver.resolvePath(config.debug, __dirname, root, source.path);
      return [absolutePath, displayName];
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