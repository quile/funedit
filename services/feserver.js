var _io = null;

var self = {
    run: function(socketio) {
        _io = socketio;

        _io.on("connection", function(socket) {
            socket.emit("hello", { foo: "bar" });
        });

        //self.addRoutes();
    },

    addRoutes: function() {
    },
};


module.exports = self;
