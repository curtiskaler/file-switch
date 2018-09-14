
const debug = require('./debug-helper');
const reader = require('./config-reader');
const copier = require('./file-copier');
const errors = require('./error-handler');

module.exports = {
  useFile: function(keyToUse) {
    if (!this.options) {
      errors.optionsNotSpecified();
    }

    if (this.options.debug) {
      debug.showArguments(this.options, keyToUse);
    }

    let [sourcePath, displayName] = reader.getSourcePath(this.options, keyToUse);

    let destinationPath = reader.getDestinationPath(this.options);

    if (this.options.debug) {
      debug.showResolved(sourcePath, destinationPath);
    }

    copier.copyFile(sourcePath, destinationPath);

    if (displayName) {
      debug.displayResult(displayName, sourcePath);
    }

    return sourcePath;
  }
};
