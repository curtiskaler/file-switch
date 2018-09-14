
const MainModule = require('./lib/main');
const errors = require('./lib/error-handler');

function FileSwitch(options) {
  if (!options) {
    errors.optionsNotSpecified();
  }
  this.options = options;
}

FileSwitch.prototype.useFile = MainModule.useFile;

module.exports = FileSwitch;
