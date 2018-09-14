const MainModule = require('./lib/main.js');

module.exports = function (options) {
  return {
    useFile: new MainModule(options).useFile
  };
};
