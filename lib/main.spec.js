
const randomString = require('../spec/spec-tools').randomString;
const MainModule = require('./main');

describe('main', ()=> {
  describe('useFile', () => {
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

    function configureService(options, source, destination) {
      reader.getSourcePath.and.returnValue([source.path, source.displayName || '']);
      reader.getDestinationPath.and.returnValue(destination.path);

      let result = MainModule;
      result.options = options;
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
        let service = configureService(options, source, destination);

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
        let service = configureService(options, source, destination);

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
        let service = configureService(options, source, destination);

        makeAssertions(service, options, source, destination);
      });
    });

    describe('(Error cases)', ()=> {
      it('throws an error when options are not set', function () {
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
        let service = configureService(null, source, destination);

        expect(()=> { service.useFile(source.key); }).toThrow();
      });
    });
  });
});