"use strict";

var _io       = null;
var _document = null;

var self = {

    // TODO: passing document in here is cheesy
    run: function(socketio, document) {
        _io = socketio;
        _document = document;

        _io.on("connection", function(socket) {
            console.log(_document.toJson());

            socket.emit("initializeContent", _document.toJson());

            socket.on("diff", function(diff) {
                console.log(diff);
            })
        });

    },
};


module.exports = self;
