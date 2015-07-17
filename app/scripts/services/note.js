(function() {
    'use strict';

    function Note(id) {
        this.id = id;

        this.top = 0;
        this.left = 0;

        this.width = 200;
        this.height = 200;

        this.zIndex = 0;

        this.inDragMode = false;

        this.color = randomColor();
        this.title = garbage(4);
        this.body = garbage(16);
    }

    Note.prototype.hasId = function(id) {
        return (this.id === id);
    };

    Note.prototype.setZIndex = function(zIndex) {
        if (!angular.isNumber(zIndex)) {
            throw new TypeError('zIndex should be a number.');
        }

        this.zIndex = zIndex;
        return this;
    };

    Note.prototype.bottom = function() {
        return (this.top + this.height);
    };

    Note.prototype.right = function() {
        return (this.left + this.width);
    };

    Note.prototype.containsPoint = function(x, y) {
        return (this.top <= y && y < this.bottom()) &&
            (this.left <= x && x < this.right());
    };

    Note.prototype.setPosition = function(top, left) {
        this.top = top;
        this.left = left;
        return this;
    };

    Note.prototype.setSize = function(width, height) {
        this.width = Math.max(1, width);
        this.height = Math.max(1, height);
    };

    var COLORS = Note.COLORS = ['yellow', 'green', 'red'];

    function randomColor() {
        var r = Math.floor(Math.random() * COLORS.length);
        return COLORS[r];
    }

    Note.prototype.setColor = function(color) {
        if (!color || COLORS.indexOf(color) === (-1))
            throw new Error('Unknown color: ' + color);

        this.color = color;
    };

    function garbage(maxWords) {
        var words = ['foo', 'bar', 'nyu', 'totally', 'sell', 'profit', 'money'];
        var wordsToGen = Math.max(1, Math.floor(Math.random()*maxWords));

        var sentence = [];
        for (var i = 0; i < wordsToGen; i += 1) {
            var wordIndex = Math.round(Math.random()*words.length);
            sentence.push(words[wordIndex]);
        }

        return sentence.join(' ');
    }

    angular
        .module('notesApp')
        .constant('Note', Note);

})();
