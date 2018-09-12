'use strict';

process.env.NODE_ENV = 'file-switch-test';

const fileSwitch = require('../src/main.js');

describe('file-switch', ()=> {

  describe('constructor', () => {
    it('sets the config property', () => {
      let config = {'foo': 'bar'};

      let service = fileSwitch(config);

      expect(service.config).toEqual(config);
    });

    it('throws an error when config is null', () => {
      let config = null;

      expect(() => {
        fileSwitch(config);
      }).toThrow();
    });

    it('throws an error when config is undefined', () => {
      expect(() => {
        fileSwitch(undefined);
      }).toThrow();
    });
  });

  describe('useFile', function () {
    describe('(Valid inputs)', () => {
      describe('minimal config', function () {

        let config = {
          sources: [
            {key: 'dev', path: 'src/environments/environment-dev.ts'},
            {key: 'prod', path: 'src/environments/environment-prod.ts'}
          ],
          destination: {path: 'src/app/configuration/environment.ts'}
        };

        let service;
        let expected = Math.random().toString(36).substring(7);

        beforeEach(() => {
          service = fileSwitch(config);

          service.copyFile = jasmine.createSpy().and.callFake( ()=> { return expected; });
          console.log(service);
        });

        [
          [true, '(with debug)'],
          [false, '(without debug)']
        ].forEach(([debug, display]) => {
          it(`calls the methods, ${display}, and returns the result`, function () {
            let source = config.sources[Math.floor(Math.random() * config.sources.length)];
            let destination = config.destination;
            let key = source.key;

            service.showArguments = jasmine.createSpy();
            service.getSourcePath = jasmine.createSpy().and.returnValue(source.path);
            service.getDestinationPath= jasmine.createSpy().and.returnValue(destination.path);
            service.displayResult = jasmine.createSpy();

            let result = service.useFile(key);

            if (debug) {
              expect(service.showArguments).toHaveBeenCalledWith(config);
            }

            expect(service.getSourcePath).toHaveBeenCalledWith(key);
            expect(service.getDestinationPath).toHaveBeenCalled();
            expect(service.copyFile).toHaveBeenCalledWith(source.path, destination.path);
            expect(service.displayResult).not.toHaveBeenCalled();
            expect(result).toEqual(expected);
          });
        });
      });
    });
  });
});