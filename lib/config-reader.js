
const logger = require('./logger.js');
const debug = require('./debug-helper.js');
const resolver = require('./path-resolver.js');

module.exports = {
  getSourcePath: (options, keyToUse) => {
    try {
      // read options
      let root = options.root || '.';
      let source = options.sources.find(item =>item.key.toLowerCase() === keyToUse.toLowerCase());

      let displayName = source.displayName || '';

      if (options.debug) {
        debug.showSourceDetails(options.debug, root, source.path, displayName);
      }

      // normalize paths
      let absolutePath = resolver.resolvePath(options.debug, __dirname, root, source.path);
      return [absolutePath, displayName];
    } catch (exception) {
      logger.error('Could not identify source file.');
      logger.error(exception);
      return null;
    }
  },

  getDestinationPath : (options) => {
    try {
      let root = options.root || '.';
      let destination = options.destination;

      if (options.debug) {
        debug.showDestinationDetails(root, destination.path);
      }

      // normalize paths
      return resolver.resolvePath(options.debug, __dirname, root, destination.path);
    } catch (exception) {
      logger.error('Could not identify destination file.');
      logger.error(exception);
      return null;
    }
  }
};