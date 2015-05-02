(function() {
    'use strict';
    
    function noteDirective(utils, $log, DragNoteService) {
        return {
          require: 'ngModel',

          templateUrl: 'views/note.html',
          
          restrict: 'E',
          link: postLink,
          scope: {
            onTitleMouseDown: '&',
            onNoteClicked: '&'
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
        }
    }

    noteDirective.$inject = ['utils', '$log', 'DragNoteService'];

    angular
        .module('notesApp')
        .directive('note', noteDirective);
 
}());
