
const errors = require('./error-handler');
const debug = require('./debug-helper');
const resolver = require('./path-resolver');
const {SOURCE, DESTINATION} = require('./file-type');

module.exports = {
  getSourcePath: (options, keyToUse) => {
    try {
      let root = options.root || '.';
      let source = options.sources.find(item =>item.key.toLowerCase() === keyToUse.toLowerCase());

      let displayName = source.displayName || '';

      if (options.debug) {
        debug.showSourceDetails(root, source.path, displayName);
      }

      let absolutePath = resolver.resolvePath(options.debug, __dirname, root, source.path);
      return [absolutePath, displayName];
    } catch (err) {
      errors.cannotIdentifyFile(SOURCE, err);
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

      return resolver.resolvePath(options.debug, __dirname, root, destination.path);
    } catch (err) {
      errors.cannotIdentifyFile(DESTINATION, err);
      return null;
    }
  }
};
