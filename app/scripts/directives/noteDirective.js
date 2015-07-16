(function() {
    'use strict';
    
    function noteDirective(utils) {
        return {
          require: 'ngModel',

          templateUrl: 'views/note.html',
          
          restrict: 'E',
          link: postLink,

          scope: {
            onTitleMouseDown: '&',
            onResizeGripMouseDown: '&',
            onClicked: '&',
            onClosed: '&'
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

                if (scope.onTitleMouseDown) {
                    scope.onTitleMouseDown({ pageX: x, pageY: y });
                }
            };

            scope._onClicked = function() {
                if (scope.onClicked) {
                    scope.onClicked({ id: scope.model.id });
                }
            };

            scope._onResizeGripMouseDown = function($event) {
                $event.preventDefault();
               
                var x = $event.pageX;
                var y = $event.pageY;
                
                if (scope.onResizeGripMouseDown) {
                    scope.onResizeGripMouseDown({ pageX: x, pageY: y });
                }
            };

            scope._onCloseButtonClick = function() {
                if (scope.onClosed) {
                    scope.onClosed({ id: scope.model.id });
                }
            };
        }
    }

    noteDirective.$inject = ['utils'];

    angular
        .module('notesApp')
        .directive('note', noteDirective);
 
}());
