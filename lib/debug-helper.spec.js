const specTools = require ('../spec/spec-tools');

describe('file-copier', ()=> {
  let debug;
  let logger;

  beforeEach( ()=> {
    debug = require('./debug-helper');
  });

  describe('displayResults', ()=> {

    beforeEach(() => {
      logger = require('./logger');
      spyOn(logger, 'info');
      spyOn(logger, 'error');

      debug.logger = logger;
    });

    it('given the displayName and sourcePath, displays them', () => {
      let displayName = specTools.randomString();
      let sourcePath = specTools.randomString();

      debug.displayResult(displayName, sourcePath);

      expect(logger.info).toHaveBeenCalledWith(`Using file: ${displayName}        [${sourcePath}]`);
    });
  });

  describe('showArguments', ()=> {

    beforeEach(() => {
      logger = require('./logger');
      spyOn(logger, 'info');
      spyOn(logger, 'error');

      debug.logger = logger;
    });

    it('when the config.debug is true, displays the config and the key to use', () => {
      let config = {debug: true};
      let keyToUse = specTools.randomString();

      debug.showArguments(config, keyToUse);

      expect(logger.info).toHaveBeenCalledWith(config);
      expect(logger.info).toHaveBeenCalledWith(`Key to use:  ['${keyToUse}']`);
    });

    it('when the config.debug is false, does not log anything', () => {
      let config = {debug: false};
      let keyToUse = specTools.randomString();

      debug.showArguments(config, keyToUse);

      expect(logger.info).not.toHaveBeenCalledWith(jasmine.any(String));
    });

    it('when the config is null, does not log anything', () => {
      let config = null;
      let keyToUse = specTools.randomString();

      debug.showArguments(config, keyToUse);

      expect(logger.info).not.toHaveBeenCalledWith(jasmine.any(String));
    });

    it('when the config is undefined, does not log anything', () => {
      let keyToUse = specTools.randomString();

      debug.showArguments(undefined, keyToUse);

      expect(logger.info).not.toHaveBeenCalledWith(jasmine.any(String));
    });

  });

  describe('showSourceDetails', ()=> {

    beforeEach(() => {
      logger = require('./logger');
      spyOn(logger, 'info');
      spyOn(logger, 'error');

      debug.logger = logger;
    });

    it('displays the root, the sourcePath, and the displayName', () => {
      let root = specTools.randomString();
      let displayName = specTools.randomString();
      let sourcePath = specTools.randomString();

      debug.showSourceDetails(root, sourcePath, displayName);

      expect(logger.info).toHaveBeenCalledWith(`       Root: [${root}]`);
      expect(logger.info).toHaveBeenCalledWith(`       Path: [${sourcePath}]`);
      expect(logger.info).toHaveBeenCalledWith(`displayName: [${displayName}]`);
    });
  });

  describe('showDestinationDetails', ()=> {

    beforeEach(() => {
      logger = require('./logger');
      spyOn(logger, 'info');
      spyOn(logger, 'error');

      debug.logger = logger;
    });

    it('displays the root, and the destinationPath', () => {
      let root = specTools.randomString();
      let destinationPath = specTools.randomString();

      debug.showDestinationDetails(root, destinationPath);

      expect(logger.info).toHaveBeenCalledWith(`       Root: [${root}]`);
      expect(logger.info).toHaveBeenCalledWith(`       Path:  [${destinationPath}]`);
    });
  });

  describe('showResolved', ()=> {

    beforeEach(() => {
      logger = require('./logger');
      spyOn(logger, 'info');
      spyOn(logger, 'error');

      debug.logger = logger;
    });

    it('displays the sourcePath, and the destinationPath', () => {
      let sourcePath = specTools.randomString();
      let destinationPath = specTools.randomString();

      debug.showResolved(sourcePath, destinationPath);

      expect(logger.info).toHaveBeenCalledWith(`     source: [${sourcePath}]`);
      expect(logger.info).toHaveBeenCalledWith(`destination: [${destinationPath}]`);
    });
  });
});
