var BahaiDate = require('./bahaidate'),
    assert = require('assert');

describe('BahaiDate', function(){
  describe('method()', function(){
    it('should return true', function(){
      var result = BahaiDate.method();
      assert.equal(true, result);
    });
  });
});
