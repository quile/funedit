(function () {
    console.log("Editor");

    var socket = io.connect();
    socket.on('hello', function (data) {
      console.log(data);
      //socket.emit('my other event', { my: 'data' });
    });
})();
