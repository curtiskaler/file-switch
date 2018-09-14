const debug = require('./debug-helper.js');
const reader = require('./config-reader.js');
const copier = require('./file-copier.js');

module.exports = class {
  constructor(options) {
    if (!options) {
      throw new Error('options must be specified.');
    }
    this.options = options;
  }

  useFile(keyToUse) {

    if (this.options.debug) {
      debug.showArguments(this.options, keyToUse);
    }

    let [sourcePath, displayName] = reader.getSourcePath(this.options, keyToUse);

    let destinationPath = reader.getDestinationPath(this.options);

    if (this.options.debug) {
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
