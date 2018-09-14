const specTools = require ('../spec/spec-tools');

describe('file-copier', ()=> {
  let copier;
  beforeEach(()=>{
    copier = require('./file-copier');
  });

  describe('copyFile', () => {
    let logger, fs;

    beforeEach(() => {
      logger = require('./logger');
      fs = require('fs');
      spyOn(fs, 'copyFile');
      spyOn(fs, 'existsSync');
      spyOn(logger, 'error');

      copier.logger = logger;
      copier.fs = fs;
    });

    it('when the source file exists, copies it to the destination', () => {
      let sourcePath = specTools.randomString();
      let destinationPath = specTools.randomString();
      fs.existsSync.and.returnValue(true);

      copier.copyFile(sourcePath, destinationPath);

      expect(fs.existsSync).toHaveBeenCalledWith(sourcePath);
      expect(fs.copyFile).toHaveBeenCalledWith(sourcePath, destinationPath);
    });

    it('when the source file does not exist, displays an error', () => {
      let sourcePath = specTools.randomString();
      let destinationPath = specTools.randomString();
      fs.existsSync.and.returnValue(false);

      copier.copyFile(sourcePath, destinationPath);

      expect(fs.existsSync).toHaveBeenCalledWith(sourcePath);
      expect(fs.copyFile).not.toHaveBeenCalledWith();
      expect(logger.error).toHaveBeenCalledWith(`file does not exist. [${sourcePath}]`);
    });

    it('displays the error when the file cannot be copied', () => {
      let error = specTools.randomString();
      let sourcePath = specTools.randomString();
      let destinationPath = specTools.randomString();
      fs.existsSync.and.returnValue(true);
      fs.copyFile.and.throwError(error);

      copier.copyFile(sourcePath, destinationPath);

      expect(fs.existsSync).toHaveBeenCalledWith(sourcePath);
      expect(fs.copyFile).toHaveBeenCalledWith(sourcePath, destinationPath);
      expect(logger.error).toHaveBeenCalledWith(new Error(error));
    });
  });

});
