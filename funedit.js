var document = require("./models/document");
var feserver = require("./services/feserver.js");

var filename = process.argv[2];

// TODO: better argument checking
if (filename) {
    var file = new document.Document().init(filename);
    console.log(file.contents().toString());
}

// TODO: manage dependency injection better with lifecycle/ecosystem code

var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);

server.listen(6789);

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

feserver.run(io);

/*
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
    console.log(data);
  });
});
*/

