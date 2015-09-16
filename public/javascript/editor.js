"use strict";

(function () {
    // connect to server
    var socket = io.connect();

    // UI code
    var _editor = null;

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

        this.bindEvents();
    };

    Editor.prototype.bindEvents = function() {
        this._contentElement.off("keyup").on("keyup", this.handleChange.bind(this));
    };

    Editor.prototype.handleChange = function(e) {
        var self = this;

        e.preventDefault();
        var newContents = self._contentElement.val();

        // https://github.com/kpdecker/jsdiff
        // TODO: build thin abstraction for diffs
        var diff = self.simplifyDiff(JsDiff.diffChars(self._document.contents, newContents));
        console.log(diff);

        // notify server of change
        socket.emit("diff", diff);
    };

    Editor.prototype.setTitle = function(value) {
        this._titleElement.html(value);
    };

    Editor.prototype.setContents = function(value) {
        this._contentElement.val(value);
    };

    Editor.prototype.simplifyDiff = function(diff) {
        var offset = 0;
        var interestingDiffs = [];

        diff.forEach(function(part) {
            if (!part.removed && !part.added) {
                // boring case, do nothing
                offset += part.count;
            } else if (part.added) {
                // added case
                part.offset = offset;
                interestingDiffs.push(part);
                offset += part.count;
            } else if (part.removed) {
                // removed case
                part.offset = offset;
                interestingDiffs.push(part);
            }
        });

        return interestingDiffs;
    };


    // Server Communication

    // TODO: structure this code better
    socket.on('initializeContent', function (data) {
        console.log(data);

        _editor = new Editor(data);
        _editor.init();
    });

})();
