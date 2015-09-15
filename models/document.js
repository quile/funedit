// Document class for banananananana
var fs  = require("fs");

function Document() {
    this._file = null;
    this._contents = null;
}

Document.prototype.init = function(file) {
    this._file = file;

    // TODO: handle file exception
    this._contents = fs.readFileSync(file).toString();
    return this;
};

Document.prototype.applyDiff = function(diff) {

};

Document.prototype.save = function() {

};

Document.prototype.contents = function() {
    return this._contents;
};

Document.prototype.toJson = function() {
    return {
        file: this._file,
        contents: this._contents
    };
};

module.exports = {
    Document: Document,
    foo: function() { return "foo" }
};

