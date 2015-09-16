"use strict";

var document = require("./models/document");
var feserver = require("./services/feserver.js");

// TODO: parse arguments with optimist or something
var filename = process.argv[2];
var file     = null;

// TODO: better argument checking
if (filename) {
    try {
        file = new document.Document().init(filename);
    } catch (e) {
        console.log(e);
        usage();
        process.exit(1);
    }
} else {
    usage();
    process.exit(1);
}

// TODO: manage dependency injection better with lifecycle/ecosystem code

var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);

// TODO: all this to be passed in via config or command-line
server.listen(6789);

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// start the websocket server
feserver.run(io, file);

function usage() {
    console.log("usage: node funedit <file>");
}