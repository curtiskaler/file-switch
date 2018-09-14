
const randomString = require('../spec/spec-tools').randomString;

describe('error-handler', ()=> {
  let handler;
  let logger;

  beforeEach(()=>{
    logger = require('./logger');
    spyOn(logger, 'error');
    logger.error.calls.reset();

    handler = require('./error-handler');
    handler.logger = logger;
  });

  describe('cannotCopyFile', ()=> {
    beforeEach(()=>{
      logger.error.calls.reset();
    });

    it('logs an error and throws', ()=> {
      let err = randomString();

      expect(()=>{handler.cannotCopyFile(err);}).toThrow(new Error(err));

      expect(logger.error).toHaveBeenCalledWith('Cannot copy file.');
    });
  });

  describe('optionsNotSpecified', ()=> {
    beforeEach(() => {
      logger.error.calls.reset();
    });

    it('logs the error \'Options not specified.\', and throws', () => {

      expect(() => {
        handler.optionsNotSpecified();
      }).toThrow(new Error('Options must be specified.'));

      expect(logger.error).toHaveBeenCalledWith('Options not specified.');
    });
  });

  describe('fileDoesNotExist', ()=> {
    beforeEach(()=>{
      logger.error.calls.reset();
    });

    it('logs the error \'File does not exist\'', ()=> {
      let path = randomString();

      expect(() => {
        handler.fileDoesNotExist(path);
      }).toThrow(new Error('File does not exist.'));

      expect(logger.error).toHaveBeenCalledWith(`File does not exist: [${path}]`);
    });
  });

  describe('cannotIdentifyFile', ()=> {
    beforeEach(()=>{
      logger.error.calls.reset();
    });

    it('logs the error \'Cannot identify file\'', ()=> {
      let path = randomString();
      let err = randomString();

      expect(() => {
        handler.cannotIdentifyFile(path, err);
      }).toThrow(new Error(err));

      expect(logger.error).toHaveBeenCalledWith(`Cannot identify file: [${path}]`);
    });

    it('given an Error, logs the error \'Cannot identify file\', and rethrows', ()=> {
      let path = randomString();
      let err = new Error(randomString());

      expect(() => {
        handler.cannotIdentifyFile(path, err);
      }).toThrow(err);

      expect(logger.error).toHaveBeenCalledWith(`Cannot identify file: [${path}]`);
    });
  });

  describe('unknownError', ()=> {
    beforeEach(()=>{
      logger.error.calls.reset();
    });

    it('given an Error, logs it and rethrows it', ()=> {
      let err = new Error(randomString());

      expect(() => {
        handler.unknownError(err);
      }).toThrow(err);

      expect(logger.error).toHaveBeenCalledWith('Unknown error.');
    });

    it('given an error message, logs it, wraps the message in an Error, and throws it', ()=> {
      let err = randomString();

      expect(() => {
        handler.unknownError(err);
      }).toThrow(new Error(err));

      expect(logger.error).toHaveBeenCalledWith('Unknown error.');
    });

    it('given neither an error nor a message, logs it and throws an \'Unknown error\'', ()=> {
      expect(() => {
        handler.unknownError();
      }).toThrow(new Error('Unknown error.'));

      expect(logger.error).toHaveBeenCalledWith('Unknown error.');
    });
  });
});