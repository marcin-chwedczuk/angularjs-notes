(function() {
    'use strict';

    function editableDirective(utils, SelectionUtils, $timeout, $log) {
        return {
            require: 'ngModel',

            templateUrl: 'views/editable.html',

            restrict: 'E',
            link: postLink,

            scope: {
                trigger: '@trigger'
            }
        };

        function postLink(scope, element, attrs, ngModelController) {
            scope.model = {
                content: '',
                isEdited: false 
            };

            ngModelController.$render = function() {
                if (scope.model.isEdited) {
                    return;
                }

                var value = ngModelController.$viewValue;

                $log.log('editable: $render: ' + value);
                scope.model.content = value;
            };

            var enableEdition = function($event) {
                var caret = SelectionUtils.getMouseEventCaretRange($event);

                scope.model.isEdited = true;

                $timeout(function() {
                    element.trigger('focus');
                    SelectionUtils.selectRange(caret);
                });
            };

            var disableEdition = function() {
                scope.model.isEdited = false;
            };

            var updateModel = function() {
                var content = element.find('[contenteditable]').html();
                ngModelController.$setViewValue(content);

                $log.log('editable: updateModel to ' + content);
            };

            var handleTrigger = function(eventName, $event) {
                if (scope.model.isEdited) {
                    $event.stopPropagation();
                    return;
                }

                if (eventName !== scope.trigger) {
                    return;
                }

                $event.preventDefault();
                enableEdition($event);
            };

            scope._onDoubleClick = function($event) {
                handleTrigger('dblclick', $event);
            };

            scope._onClick = function($event) {
                handleTrigger('click', $event);
            };

            scope._onMouseDown = function($event) {
                handleTrigger('mousedown', $event);
            };

            scope.$on('document_mousedown', function(angularEvent, jQueryEvent) {
                utils.unused(angularEvent);

                if (!scope.model.isEdited) {
                    return;
                }

                var userClickedOutsideEditable = 
                    !element.is(jQueryEvent.target) &&
                    !element.has(jQueryEvent.target).length;

                if (userClickedOutsideEditable) {
                    $log.log('editable: disable edition (document_mousedown)');
                    disableEdition();
                    updateModel();
                }
            });
        }
    }

    editableDirective.$inject = ['utils', 'SelectionUtils', '$timeout', '$log'];

    angular
        .module('notesApp')
        .directive('editable', editableDirective);

}());
