(function() {
    'use strict';

    var utils = {
        unused: function() { },
        copyProperties: copyProperties
    };

    function copyProperties(dest, src) {
        for (var prop in src) {
            if (src.hasOwnProperty(prop)) {
                dest[prop] = src[prop];
            }
        }

        return dest;
    }

    angular
        .module('notesApp')
        .constant('utils', utils);

})();
