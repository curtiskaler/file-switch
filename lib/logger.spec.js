// import install from 'jasmine-es6';
// install();

const logger = require('./logger');
const specTools = require ('../spec/spec-tools');

describe('logger', ()=> {

  describe('info', () => {
    beforeEach(() => {
      spyOn(global.console, 'error');
      spyOn(global.console, 'info');
    });

    it('calls console.info with specified input', () => {
      let input = specTools.randomString();

      logger.info(input);

      expect(global.console.info).toHaveBeenCalledWith(input);
      expect(global.console.error).not.toHaveBeenCalled();
    });
  });

  describe('error', () => {
    beforeEach(() => {
      spyOn(global.console, 'error');
      spyOn(global.console, 'info');
    });

    it('calls console.error with specified input', () => {
      let input = specTools.randomString();

      logger.error(input);

      expect(global.console.error).toHaveBeenCalledWith(input);
      expect(global.console.info).not.toHaveBeenCalled();
    });
  });
});
