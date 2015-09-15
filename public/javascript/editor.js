(function () {
    console.log("Editor");

    // TODO: structure this code better

    var titleElement = $('.title');
    var contentElement = $('.content');

    // connect to server
    var socket = io.connect();
    socket.on('initializeContent', function (data) {
        console.log(data);

        //socket.emit('my other event', { my: 'data' });
    });



})();
