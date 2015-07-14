(function() {
    'use strict';
    
    function noteDirective(utils, SelectionUtils, $timeout, $log) {
        return {
          require: 'ngModel',

          templateUrl: 'views/note.html',
          
          restrict: 'E',
          link: postLink,
          scope: {
            onTitleMouseDown: '&',
            onNoteClicked: '&',
            onResizeGripMouseDown: '&'
          },
        };
                  
        function postLink(scope, element, attrs, ngModelController) {
            utils.unused(element, attrs);

            ngModelController.$render = function() {
                var $viewValue = ngModelController.$viewValue;
                scope.model = $viewValue;
            };

            scope._onTitleMouseDown = function($event) {
                $event.preventDefault();

                var x = $event.pageX;
                var y = $event.pageY;

                $log.debug('note title click (x: ' + x + ', y: ' + y + ')');

                if (scope.onTitleMouseDown) {
                    scope.onTitleMouseDown({ x:x, y:y });
                }
            };

            scope._onNoteClicked = function() {
                $log.debug('NOTE CLICKED!');
                if (scope.onNoteClicked) {
                    scope.onNoteClicked({ id: scope.model.id });
                }
            };

            scope._onResizeGripMouseDown = function($event) {
                $log.debug('RESIZE GRIP CLICKED!');
                $event.preventDefault();
               
                var x = $event.pageX;
                var y = $event.pageY;

                $log.debug('resize grip clicked (x: ' + x + ', y: ' + y + ')');
                
                if (scope.onResizeGripMouseDown) {
                    scope.onResizeGripMouseDown({ x:x, y:y });
                }
            };
        }
    }

    noteDirective.$inject = ['utils', 'SelectionUtils', '$timeout', '$log'];

    angular
        .module('notesApp')
        .directive('note', noteDirective);
 
}());
