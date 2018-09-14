
const logger = require('./logger');

function callback(header, err) {
  logger.error(header);
  if (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error(err);
    }
  } else {
    throw new Error('Unknown error.');
  }
}

module.exports = {
  cannotCopyFile: (err) => {
    callback('Cannot copy file.', err);
  },
  optionsNotSpecified: () => {
    callback('Options not specified.', new Error('Options must be specified.'));
  },
  fileDoesNotExist: (path) => {
    callback(`File does not exist: [${path}]`, new Error('File does not exist.'));
  },
  cannotIdentifyFile: (type, err) => {
    callback(`Cannot identify file: [${type}]`, err);
  },
  unknownError: (err) => {
    callback('Unknown error.', err);
  }
};
