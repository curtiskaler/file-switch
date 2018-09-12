

import debug from './debug-helper.js';
import reader from './config-reader.js';
import copier from './file-copier.js';

export default (config) => {
  if (!config) {
    throw new Error(`Config (${config}) must be defined.`);
  }

  const exports = { config: config };

  exports.useFile = function(keyToUse) {

    if (config.debug) {
      debug.showArguments(config, keyToUse);
    }

    let [sourcePath, displayName] = reader.getSourcePath(config, keyToUse);
    let destinationPath = reader.getDestinationPath(config);

    if (config.debug) {
      debug.showResolved(sourcePath, destinationPath);
    }

    // copy the file
    copier.copyFile(sourcePath, destinationPath);

    if (displayName) {
      debug.displayResult(displayName, sourcePath);
    }

    return sourcePath;
  };

  return exports;
};
