const MainModule = require('./lib/main.js');

module.exports = function (config) {
  return {
    useFile: new MainModule(config).useFile
  };
};
