
const randomString = require('../spec/spec-tools').randomString;

describe('file-copier', ()=> {
  let copier;
  let fs, errors;

  beforeEach(() => {
    copier = require('./file-copier.js');
  });

  describe('copyFile', () => {

    describe('(valid inputs)', () => {

      beforeEach(() => {
        errors = require('./error-handler');
        spyOn(errors, 'fileDoesNotExist');
        spyOn(errors, 'cannotCopyFile');

        fs = require('fs');
        spyOn(fs, 'copyFileSync');
        spyOn(fs, 'existsSync');

        copier.errors = errors;
        copier.fs = fs;
      });

      it('when the source file exists, copies it to the destination', () => {
        let sourcePath = randomString();
        let destinationPath = randomString();
        fs.existsSync.and.returnValue(true);

        copier.copyFile(sourcePath, destinationPath);

        expect(fs.existsSync).toHaveBeenCalledWith(sourcePath);
        expect(fs.copyFileSync).toHaveBeenCalledWith(sourcePath, destinationPath, jasmine.any(Function));
      });

      it('when the source file does not exist, displays an error', () => {
        let sourcePath = randomString();
        let destinationPath = randomString();
        fs.existsSync.and.returnValue(false);

        copier.copyFile(sourcePath, destinationPath);

        expect(fs.existsSync).toHaveBeenCalledWith(sourcePath);
        expect(fs.copyFileSync).not.toHaveBeenCalledWith();
        expect(errors.fileDoesNotExist).toHaveBeenCalledWith(sourcePath);
      });

      it('displays the error when the file cannot be copied', () => {
        let error = randomString();
        let sourcePath = randomString();
        let destinationPath = randomString();
        fs.existsSync.and.returnValue(true);
        fs.copyFileSync.and.throwError(error);

        copier.copyFile(sourcePath, destinationPath);

        expect(fs.existsSync).toHaveBeenCalledWith(sourcePath);
        expect(fs.copyFileSync).toHaveBeenCalledWith(sourcePath, destinationPath, jasmine.any(Function));
        expect(errors.cannotCopyFile).toHaveBeenCalledWith(new Error(error));
      });
    });

    describe('(error cases)', () => {
      beforeEach(() => {
        errors = require('./error-handler');
        spyOn(errors, 'fileDoesNotExist');
        spyOn(errors, 'cannotCopyFile');

        fs = require('fs');
        spyOn(fs, 'copyFileSync');
        spyOn(fs, 'existsSync');

        copier.errors = errors;
        copier.fs = fs;
      });

      it('uses the provided error callback if one is provided', () => {
        let sourcePath = randomString();
        let destinationPath = randomString();
        fs.existsSync.and.returnValue(true);
        let callback = (err) => {
          console.log(err);
        };

        copier.copyFile(sourcePath, destinationPath, callback);

        expect(fs.existsSync).toHaveBeenCalledWith(sourcePath);
        expect(fs.copyFileSync).toHaveBeenCalledWith(sourcePath, destinationPath, callback);
      });

      it('sets up its own error callback if one is not provided', () => {
        let sourcePath = randomString();
        let destinationPath = randomString();
        fs.existsSync.and.returnValue(true);

        copier.copyFile(sourcePath, destinationPath, null);

        expect(fs.existsSync).toHaveBeenCalledWith(sourcePath);
        expect(fs.copyFileSync).toHaveBeenCalledWith(sourcePath, destinationPath, errors.cannotCopyFile);
      });
    });
  });
});
