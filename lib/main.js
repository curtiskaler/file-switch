const debug = require('./debug-helper.js');
const reader = require('./config-reader.js');
const copier = require('./file-copier.js');

module.exports = class {
  constructor(config) {
    if (!config) {
      throw new Error('config must be specified.');
    }
    this.config = config;
  }

  useFile(keyToUse) {

    if (this.config.debug) {
      debug.showArguments(this.config, keyToUse);
    }

    let [sourcePath, displayName] = reader.getSourcePath(this.config, keyToUse);

    let destinationPath = reader.getDestinationPath(this.config);

    if (this.config.debug) {
      debug.showResolved(sourcePath, destinationPath);
    }

    // copy the file
    copier.copyFile(sourcePath, destinationPath);

    if (displayName) {
      debug.displayResult(displayName, sourcePath);
    }

    return sourcePath;
  }
};
