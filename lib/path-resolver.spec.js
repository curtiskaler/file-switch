const specTools = require ('../spec/spec-tools');

describe('path-resolver', ()=> {
  let resolver;
  beforeEach(()=>{
    resolver = require('./path-resolver');
  });

  describe('resolvePath', () => {
    let path, logger;

    beforeEach(() => {
      path = require('path');
      logger = require('./logger.js');
      spyOn(path, 'resolve');
      spyOn(logger, 'info');

      resolver.path = path;
    });

    describe('(with debug=true)', ()=>{
      it('calls path.resolve with specified inputs, displays the result, and returns the result', () => {
        let input1 = specTools.randomString();
        let input2 = specTools.randomString();
        let input3 = specTools.randomString();
        let expected = specTools.randomString();
        path.resolve.and.returnValue(expected);

        let result = resolver.resolvePath(true, input1, input2, input3);

        expect (path.resolve).toHaveBeenCalledWith(input1, input2, input3);
        expect(logger.info).toHaveBeenCalledWith(`   resolved: [${result}]`);
        expect(result).toEqual(expected);
      });
    });

    describe('(with debug=false)', ()=>{
      it('calls path.resolve with specified inputs, and returns the result', () => {
        let input1 = specTools.randomString();
        let input2 = specTools.randomString();
        let input3 = specTools.randomString();
        let expected = specTools.randomString();
        path.resolve.and.returnValue(expected);

        let result = resolver.resolvePath(false, input1, input2, input3);

        expect (path.resolve).toHaveBeenCalledWith(input1, input2, input3);
        expect(logger.info).not.toHaveBeenCalled();
        expect(result).toEqual(expected);
      });
    });
  });
});
