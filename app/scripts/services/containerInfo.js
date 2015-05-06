(function() {
    'use strict';

    function ContainerInfo($log) {
        var _top, _left, _width, _height;

        return {
            updateContainerSize: updateContainerSize,
            updateContainerStart: updateContainerStart,

            reset: reset
        };

        function reset() {
            _top = _left = 0;
            _width = _height = Number.MAX_VALUE;
        }

        function updateContainerSize(width, height) {
            width = Number(width);
            height = Number(height);

            if (isNaN(width) || isNaN(height)) {
                throw new TypeError('width and height must be numbers.');
            }

            _width = width;
            _height = height;

            $log.debug('container size changed to ', _width, ' x ', _height);
        }

        function updateContainerStart(top, left) {
            top = Number(top);
            left = Number(left);

            if (isNaN(top) || isNaN(left)) {
                throw new TypeError('top and left must be numbers.');
            }

            _top = top;
            _left = left;

            $log.debug('container start changed to ', _top, ' x ', _left);
        }
    }

    ContainerInfo.$inject = ['$log'];

    angular
        .module('notesApp')
        .service('ContainerInfo', ContainerInfo); 

})();
