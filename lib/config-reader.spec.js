const randomString = require ('../spec/spec-tools').randomString;
const {SOURCE, DESTINATION} = require('./file-type');

describe('config-reader', ()=> {
  let reader;
  let errors, debug, resolver;

  beforeEach(() => {
    reader = require('./config-reader');
  });

  describe('getSourcePath', () => {

    beforeEach(() => {
      errors = require('./error-handler');
      spyOn(errors, 'cannotIdentifyFile');

      debug = require('./debug-helper');
      spyOn(debug, 'showSourceDetails');

      resolver = require('./path-resolver');
      spyOn(resolver, 'resolvePath');

      reader.errors = errors;
      reader.debug = debug;
      reader.resolver = resolver;
    });

    it('when debug is true, it displays the source info, resolves the path, and returns an array with the source path and displayName', () => {
      let options = {
        debug: true,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let source = options.sources[Math.floor(Math.random() * options.sources.length)];
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getSourcePath(options, source.key);

      expect(debug.showSourceDetails).toHaveBeenCalledWith(options.root, source.path, source.displayName);
      expect(resolver.resolvePath).toHaveBeenCalledWith(options.debug, __dirname, options.root, source.path);
      expect(result).toEqual([absolutePath, source.displayName]);
    });

    it('when debug is false, it resolves the path, and returns an array with the source path and displayName', () => {
      let options = {
        debug: false,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let source = options.sources[Math.floor(Math.random() * options.sources.length)];
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getSourcePath(options, source.key);

      expect(debug.showSourceDetails).not.toHaveBeenCalled();
      expect(resolver.resolvePath).toHaveBeenCalledWith(options.debug, __dirname, options.root, source.path);
      expect(result).toEqual([absolutePath, source.displayName]);
    });

    it('when it cannot resolve the path, logs an error that it could not identify the source file', () => {
      let errorMessage = randomString();
      let options = {
        debug: false,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let source = options.sources[Math.floor(Math.random() * options.sources.length)];
      resolver.resolvePath.and.throwError(errorMessage);

      let result = reader.getSourcePath(options, source.key);

      expect(resolver.resolvePath).toHaveBeenCalledWith(options.debug, __dirname, options.root, source.path);
      expect(errors.cannotIdentifyFile).toHaveBeenCalledWith(SOURCE, new Error(errorMessage));
      expect(result).toEqual(null);
    });

    it('when root is not specified, it resolves the source against \'.\'', () => {
      let options = {
        debug: false,
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let source = options.sources[Math.floor(Math.random() * options.sources.length)];
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getSourcePath(options, source.key);

      expect(resolver.resolvePath).toHaveBeenCalledWith(options.debug, __dirname, '.', source.path);
      expect(result).toEqual([absolutePath, source.displayName]);
    });

    it('when displayName is not specified, it resolves the displayName to \'\'', () => {
      let options = {
        debug: true,
        root: randomString(),
        sources: [
          {key: randomString(), path: randomString()},
          {key: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let source = options.sources[Math.floor(Math.random() * options.sources.length)];
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getSourcePath(options, source.key);

      expect(debug.showSourceDetails).toHaveBeenCalledWith(options.root, source.path, '');
      expect(resolver.resolvePath).toHaveBeenCalledWith(options.debug, __dirname, options.root, source.path);
      expect(result).toEqual([absolutePath, '']);
    });
  });

  describe('getDestinationPath', () => {

    beforeEach(() => {
      errors = require('./error-handler');
      spyOn(errors, 'cannotIdentifyFile');

      debug = require('./debug-helper');
      spyOn(debug, 'showDestinationDetails');

      resolver = require('./path-resolver');
      spyOn(resolver, 'resolvePath');

      reader.errors = errors;
      reader.debug = debug;
      reader.resolver = resolver;
    });

    it('when debug is true, it displays the destination info, resolves the path, and returns the absolute destination path', () => {
      let options = {
        debug: true,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let destination = options.destination;
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getDestinationPath(options);

      expect(debug.showDestinationDetails).toHaveBeenCalledWith(options.root, destination.path);
      expect(resolver.resolvePath).toHaveBeenCalledWith(options.debug, __dirname, options.root, destination.path);
      expect(result).toEqual(absolutePath);
    });

    it('when debug is false, it resolves the path, and returns the absolute destination path', () => {
      let options = {
        debug: false,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let destination = options.destination;
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getDestinationPath(options);

      expect(debug.showDestinationDetails).not.toHaveBeenCalled();
      expect(resolver.resolvePath).toHaveBeenCalledWith(options.debug, __dirname, options.root, destination.path);
      expect(result).toEqual(absolutePath);
    });

    it('when it cannot resolve the path, logs an error that it could not identify the destination file', () => {
      let errorMessage = randomString();
      let options = {
        debug: false,
        root: randomString(),
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let destination = options.destination;
      resolver.resolvePath.and.throwError(errorMessage);

      let result = reader.getDestinationPath(options);

      expect(resolver.resolvePath).toHaveBeenCalledWith(options.debug, __dirname, options.root, destination.path);
      expect(errors.cannotIdentifyFile).toHaveBeenCalledWith(DESTINATION, new Error(errorMessage));
      expect(result).toEqual(null);
    });

    it('when root is not specified, it resolves the destination against \'.\'', () => {
      let options = {
        debug: false,
        sources: [
          {key: randomString(), displayName: randomString(), path: randomString()},
          {key: randomString(), displayName: randomString(), path: randomString()}
        ],
        destination: {path: randomString()}
      };
      let destination = options.destination;
      let absolutePath = randomString();
      resolver.resolvePath.and.returnValue(absolutePath);

      let result = reader.getDestinationPath(options);

      expect(debug.showDestinationDetails).not.toHaveBeenCalled();
      expect(resolver.resolvePath).toHaveBeenCalledWith(options.debug, __dirname, '.', destination.path);
      expect(result).toEqual(absolutePath);
    });
  });
});
