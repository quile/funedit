"use strict";

(function () {
    console.log("Editor");

    var _editor = null;

    // UI

    function Editor(doc) {
        // Data elements
        // TODO: try to use isomorphic JS for this
        this._document = doc;

        // UI elements
        this._titleElement = $(".title");
        this._contentElement = $(".content");
    }

    Editor.prototype.init = function() {
        this.setTitle(this._document.file);
        this.setContents(this._document.contents);
    };

    Editor.prototype.setTitle = function(value) {
        this._titleElement.html(value);
    };

    Editor.prototype.setContents = function(value) {
        this._contentElement.val(value);
    }

    // Communication


    // TODO: structure this code better

    // connect to server
    var socket = io.connect();
    socket.on('initializeContent', function (data) {
        console.log(data);

        _editor = new Editor(data);

        _editor.init();

        //socket.emit('my other event', { my: 'data' });
    });



})();
