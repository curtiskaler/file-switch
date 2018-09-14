const randomString = require ('../spec/spec-tools').randomString;

describe('config-reader', ()=> {
  let reader;
  let logger, debug, resolver;

  beforeEach(() => {
    reader = require('./config-reader');
  });

  describe('getSourcePath', () => {

    beforeEach(() => {
      logger = require('./logger');
      spyOn(logger, 'info');
      spyOn(logger, 'error');

      debug = require('./debug-helper.js');
      spyOn(debug, 'showSourceDetails');

      resolver = require('./path-resolver.js');
      spyOn(resolver, 'resolvePath');

      reader.logger = logger;
      reader.debug = debug;
      reader.resolver = resolver;
    });

    it('when debug is true, it displays the source info, resolves the path, and returns an array with the source path and displayName', () => {
      let config = {
        debug: true,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let source = config.sources[Math.floor(Math.random() * config.sources.length)];
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getSourcePath(config, source.key);

      expect(debug.showSourceDetails).toHaveBeenCalledWith(config.debug, config.root, source.path, source.displayName);
      expect(resolver.resolvePath).toHaveBeenCalledWith(config.debug, __dirname, config.root, source.path);
      expect(result).toEqual([absolutePath, source.displayName]);
    });

    it('when debug is false, it resolves the path, and returns an array with the source path and displayName', () => {
      let config = {
        debug: false,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let source = config.sources[Math.floor(Math.random() * config.sources.length)];
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getSourcePath(config, source.key);

      expect(debug.showSourceDetails).not.toHaveBeenCalled();
      expect(resolver.resolvePath).toHaveBeenCalledWith(config.debug, __dirname, config.root, source.path);
      expect(result).toEqual([absolutePath, source.displayName]);
    });

    it('when it cannot resolve the path, logs an error that it could not identify the source file', () => {
      let errorMessage = randomString();
      let config = {
        debug: false,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let source = config.sources[Math.floor(Math.random() * config.sources.length)];
      resolver.resolvePath.and.throwError(errorMessage);

      let result = reader.getSourcePath(config, source.key);

      expect(resolver.resolvePath).toHaveBeenCalledWith(config.debug, __dirname, config.root, source.path);
      expect(logger.error).toHaveBeenCalledWith('Could not identify source file.');
      expect(logger.error).toHaveBeenCalledWith(new Error(errorMessage));
      expect(result).toEqual(null);
    });

    it('when root is not specified, it resolves the source against \'.\'', () => {
      let config = {
        debug: false,
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let source = config.sources[Math.floor(Math.random() * config.sources.length)];
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getSourcePath(config, source.key);

      expect(resolver.resolvePath).toHaveBeenCalledWith(config.debug, __dirname, '.', source.path);
      expect(result).toEqual([absolutePath, source.displayName]);
    });

    it('when displayName is not specified, it resolves the displayName to \'\'', () => {
      let config = {
        debug: true,
        root: randomString(),
        sources: [
          {key: randomString(), path: randomString()},
          {key: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let source = config.sources[Math.floor(Math.random() * config.sources.length)];
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getSourcePath(config, source.key);

      expect(debug.showSourceDetails).toHaveBeenCalledWith(config.debug, config.root, source.path, '');
      expect(resolver.resolvePath).toHaveBeenCalledWith(config.debug, __dirname, config.root, source.path);
      expect(result).toEqual([absolutePath, '']);
    });
  });

  describe('getDestinationPath', () => {

    beforeEach(() => {
      logger = require('./logger');
      spyOn(logger, 'info');
      spyOn(logger, 'error');

      debug = require('./debug-helper.js');
      spyOn(debug, 'showDestinationDetails');

      resolver = require('./path-resolver.js');
      spyOn(resolver, 'resolvePath');

      reader.logger = logger;
      reader.debug = debug;
      reader.resolver = resolver;
    });

    it('when debug is true, it displays the destination info, resolves the path, and returns the absolute destination path', () => {
      let config = {
        debug: true,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let destination = config.destination;
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getDestinationPath(config);

      expect(debug.showDestinationDetails).toHaveBeenCalledWith(config.root, destination.path);
      expect(resolver.resolvePath).toHaveBeenCalledWith(config.debug, __dirname, config.root, destination.path);
      expect(result).toEqual(absolutePath);
    });

    it('when debug is false, it resolves the path, and returns the absolute destination path', () => {
      let config = {
        debug: false,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let destination = config.destination;
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getDestinationPath(config);

      expect(debug.showDestinationDetails).not.toHaveBeenCalled();
      expect(resolver.resolvePath).toHaveBeenCalledWith(config.debug, __dirname, config.root, destination.path);
      expect(result).toEqual(absolutePath);
    });

    it('when it cannot resolve the path, logs an error that it could not identify the destination file', () => {
      let errorMessage = randomString();
      let config = {
        debug: false,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let destination = config.destination;
      resolver.resolvePath.and.throwError(errorMessage);

      let result = reader.getDestinationPath(config);

      expect(resolver.resolvePath).toHaveBeenCalledWith(config.debug, __dirname, config.root, destination.path);
      expect(logger.error).toHaveBeenCalledWith('Could not identify destination file.');
      expect(logger.error).toHaveBeenCalledWith(new Error(errorMessage));
      expect(result).toEqual(null);
    });

    it('when root is not specified, it resolves the destination against \'.\'', () => {
      let config = {
        debug: false,
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let destination = config.destination;
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getDestinationPath(config);

      expect(debug.showDestinationDetails).not.toHaveBeenCalled();
      expect(resolver.resolvePath).toHaveBeenCalledWith(config.debug, __dirname, '.', destination.path);
      expect(result).toEqual(absolutePath);
    });
  });
});
