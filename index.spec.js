

const randomString = require('./spec/spec-tools').randomString;
const MainModule = require('./lib/main');
const FileSwitch = require('./index');

describe('index', ()=> {
  describe('constructor', () => {
    let errors, MainModule;

    beforeEach(() => {
      errors = require('./lib/error-handler');
      spyOn(errors, 'optionsNotSpecified').and.throwError(randomString());

      FileSwitch.errors = errors;
    });

    it('sets the options property', () => {
      let options = {debug: false};

      let service = new FileSwitch(options);

      expect(service.options).toEqual(options);
    });

    it('throws an error when the options are null', () => {
      let options = null;

      expect(()=>{
        new FileSwitch(options);
      }).toThrow();

      expect(errors.optionsNotSpecified).toHaveBeenCalledWith();
    });

    it('throws an error when options is undefined or not provided', () => {
      expect(()=>{
        new FileSwitch();
      }).toThrow();

      expect(errors.optionsNotSpecified).toHaveBeenCalledWith();
    });
  });

  describe('useFile', ()=> {
    it('calls through to MainModule.useFile', () => {
      expect(FileSwitch.prototype.useFile).toEqual(MainModule.useFile);
    });
  });
});