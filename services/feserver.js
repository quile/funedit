"use strict";

var _io       = null;
var _document = null;

var self = {

    // TODO: passing document in here is cheesy
    run: function(socketio, document) {
        _io = socketio;
        _document = document;

        _io.on("connection", self.handleConnection.bind(self));
    },

    handleConnection: function(socket) {
        console.log(_document.toJson());

        // Send document to client
        socket.emit("initializeContent", _document.toJson());

        // Receive a diff from the client
        socket.on("diff", function(diff) {
            console.log(diff);
        })
    }
};


module.exports = self;
