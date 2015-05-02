(function() {
    'use strict';

    function notesContainer($rootScope, utils, NotesService, DragNoteService) {
        return {
            templateUrl: 'views/notescontainer.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {},
            link: postLink
        };

        function postLink(scope, element, attrs, ngModelController) {
            utils.unused(scope, element, attrs, ngModelController);

            ngModelController.$render = function() {
                scope.notes = ngModelController.$viewValue;
            };

            scope.onNoteTitleMouseDown = function(x, y) {
                DragNoteService.pointerDown(x,y);
            };

            scope.onNoteClicked = function(noteId) {
                NotesService.bringNoteToFront(noteId);
            };

            element.on('mousemove', function($event) {
                $rootScope.$apply(function() {
                    DragNoteService.pointerMove($event.pageX, $event.pageY);
                });
            });

            element.on('mouseup', function($event) {
                $rootScope.$apply(function() {
                    DragNoteService.pointerUp($event.pageX, $event.pageY);
                });
            });

            element.on('mouseleave', function() {
                $rootScope.$apply(function() {
                    DragNoteService.pointerLeave();
                });
            });
        }
    }

    notesContainer.$inject = [
        '$rootScope', 
        'utils', 
        'NotesService', 
        'DragNoteService']; 
                  
    angular
        .module('notesApp')
        .directive('notesContainer', notesContainer);

})();
