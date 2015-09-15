var document = require("./models/document");

var filename = process.argv[2];

// TODO: better argument checking
if (filename) {
    var file = new document.Document().init(filename);
    console.log(file.contents().toString());
}


