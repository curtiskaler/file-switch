const randomString = require('../spec/spec-tools').randomString;
const UseFile = require('./main.js');

process.env.NODE_ENV = 'file-switch-test';

describe('use-file', ()=> {

  describe('constructor', () => {
    it('sets the config property', () => {
      let config2 = {debug: false};

      let service = new UseFile(config2);

      expect(service.config).toEqual(config2);
    });

    it('throws an error when config is null', () => {
      let config = null;

      expect(() => {
        new UseFile(config);
      }).toThrow();
    });

    it('throws an error when config is undefined', () => {
      expect(() => {
        new UseFile(undefined);
      }).toThrow();
    });
  });

  describe('useFile', () => {
    // let service;
    let debug, copier, reader;

    beforeEach(() => {
      debug = require('./debug-helper.js');
      spyOn(debug, 'showArguments');
      spyOn(debug, 'showResolved');
      spyOn(debug, 'displayResult');

      reader = require('./config-reader.js');
      spyOn(reader, 'getSourcePath');
      spyOn(reader, 'getDestinationPath');

      copier = require('./file-copier.js');
      spyOn(copier, 'copyFile').and.callFake((arg1, arg2) => {
        return arg2;
      });
    });

    function configureService(config, source, destination) {
      reader.getSourcePath.and.returnValue([source.path, source.displayName || '']);
      reader.getDestinationPath.and.returnValue(destination.path);

      let result = new UseFile(config);
      result.debug = debug;
      result.reader = reader;
      result.copier = copier;

      return result;
    }

    function makeAssertions(service, config, source, destination) {

      let result = service.useFile(source.key);

      if (config.debug) {
        expect(debug.showArguments).toHaveBeenCalledWith(config, source.key);
      }

      expect(reader.getSourcePath).toHaveBeenCalledWith(config, source.key);
      expect(reader.getDestinationPath).toHaveBeenCalledWith(config);
      if (config.debug) {
        expect(debug.showResolved).toHaveBeenCalledWith(source.path, destination.path);
      }

      expect(copier.copyFile).toHaveBeenCalledWith(source.path, destination.path);

      if (source.displayName) {
        expect(debug.displayResult).toHaveBeenCalledWith(source.displayName, source.path);
      } else {
        expect(debug.displayResult).not.toHaveBeenCalled();
      }

      expect(result).toEqual(source.path);
    }

    describe('(Valid inputs)', () => {


      it('without debug parameter, calls the expected methods, and returns the result', function () {
        let config = {
          sources: [
            {key: 'dev', path: randomString()},
            {key: 'prod', path: randomString()}
          ],
          destination: {path: randomString()}
        };
        let source = config.sources[Math.floor(Math.random() * config.sources.length)];
        let destination = config.destination;
        let service = configureService(config, source, destination);

        makeAssertions(service, config, source, destination);
      });

      it('when a displayName is included the result is displayed', function () {
        let config = {
          sources: [
            {key: 'dev', displayName: randomString(), path: randomString()},
            {key: 'prod', displayName: randomString(), path: randomString()}
          ],
          destination: {path: randomString()}
        };
        let source = config.sources[Math.floor(Math.random() * config.sources.length)];
        let destination = config.destination;
        let service = configureService(config, source, destination);

        makeAssertions(service, config, source, destination);
      });

      it('with debug parameter, calls the expected methods, displays debug info, and returns the result', function () {
        let config = {
          debug: true,
          sources: [
            {key: 'dev', path: randomString()},
            {key: 'prod', path: randomString()}
          ],
          destination: {path: randomString()}
        };
        let source = config.sources[Math.floor(Math.random() * config.sources.length)];
        let destination = config.destination;
        let service = configureService(config, source, destination);

        makeAssertions(service, config, source, destination);
      });
    });
  });
});