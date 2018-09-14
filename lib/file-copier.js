
const fs = require('fs');
const errors = require('./error-handler');

module.exports = {
  copyFile: (sourcePath, destinationPath, errorCallback) => {
    errorCallback = errorCallback || errors.cannotCopyFile;

    try {
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destinationPath, errorCallback);
      } else {
        errors.fileDoesNotExist(sourcePath);
      }
    } catch (err) {
      errors.cannotCopyFile(err);
    }
  }
};
