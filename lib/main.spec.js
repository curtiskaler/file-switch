const randomString = require('../spec/spec-tools').randomString;
const UseFile = require('./main.js');

describe('use-file', ()=> {

  describe('constructor', () => {
    it('sets the options property', () => {
      let options = {debug: false};

      let service = new UseFile(options);

      expect(service.options).toEqual(options);
    });

    it('throws an error when options is null', () => {
      let options = null;

      expect(() => {
        new UseFile(options);
      }).toThrow();
    });

    it('throws an error when options is undefined', () => {
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

    function optionsureService(options, source, destination) {
      reader.getSourcePath.and.returnValue([source.path, source.displayName || '']);
      reader.getDestinationPath.and.returnValue(destination.path);

      let result = new UseFile(options);
      result.debug = debug;
      result.reader = reader;
      result.copier = copier;

      return result;
    }

    function makeAssertions(service, options, source, destination) {

      let result = service.useFile(source.key);

      if (options.debug) {
        expect(debug.showArguments).toHaveBeenCalledWith(options, source.key);
      }

      expect(reader.getSourcePath).toHaveBeenCalledWith(options, source.key);
      expect(reader.getDestinationPath).toHaveBeenCalledWith(options);
      if (options.debug) {
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
        let options = {
          sources: [
            {key: 'dev', path: randomString()},
            {key: 'prod', path: randomString()}
          ],
          destination: {path: randomString()}
        };
        let source = options.sources[Math.floor(Math.random() * options.sources.length)];
        let destination = options.destination;
        let service = optionsureService(options, source, destination);

        makeAssertions(service, options, source, destination);
      });

      it('when a displayName is included the result is displayed', function () {
        let options = {
          sources: [
            {key: 'dev', displayName: randomString(), path: randomString()},
            {key: 'prod', displayName: randomString(), path: randomString()}
          ],
          destination: {path: randomString()}
        };
        let source = options.sources[Math.floor(Math.random() * options.sources.length)];
        let destination = options.destination;
        let service = optionsureService(options, source, destination);

        makeAssertions(service, options, source, destination);
      });

      it('with debug parameter, calls the expected methods, displays debug info, and returns the result', function () {
        let options = {
          debug: true,
          sources: [
            {key: 'dev', path: randomString()},
            {key: 'prod', path: randomString()}
          ],
          destination: {path: randomString()}
        };
        let source = options.sources[Math.floor(Math.random() * options.sources.length)];
        let destination = options.destination;
        let service = optionsureService(options, source, destination);

        makeAssertions(service, options, source, destination);
      });
    });
  });
});