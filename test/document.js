var doc = require("../models/document");

var assert = require("assert");
describe('Document', function() {
  describe('#foo()', function () {
    it('should return foo', function () {
      assert.equal("foo", doc.foo());
    });
  });

  describe('#init(file)', function() {
    it('should load a test file', function() {
      var thisDocument = new doc.Document();
      thisDocument.init(__dirname + "/resources/testfile.txt");
    });
  });
});
