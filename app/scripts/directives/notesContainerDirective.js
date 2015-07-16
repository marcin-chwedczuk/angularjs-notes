(function() {
    'use strict';

    function notesContainerDirective(
        $rootScope, $window, utils, 
        NotesService, DragNoteService, ResizeService, ContainerInfo) 
    {
        return {
            templateUrl: 'views/notescontainer.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {},
            link: postLink
        };

        function postLink(scope, element, attrs, ngModelController) {
            utils.unused(attrs);

            ngModelController.$render = function() {
                scope.notes = ngModelController.$viewValue;
            };

            scope.onNoteTitleMouseDown = function(pageX, pageY) {
                if (!ResizeService.isResizingNote()) {
                    callWithContainerOffset(DragNoteService.pointerDown, pageX, pageY);
                }
            };

            scope.onNoteClicked = function(noteId) {
                NotesService.bringNoteToFront(noteId);
            };

            scope.onNoteResizeGripMouseDown = function(pageX, pageY) {
                if (!DragNoteService.isDraggingNote()) {
                    callWithContainerOffset(ResizeService.pointerDown, pageX, pageY);
                }
            };

            scope.onNoteClosed = function(noteId) { 
                NotesService.deleteNote(noteId);
            };

            var notesContainer = element.find('.notes-container');

            ContainerInfo.updateContainerStart(0, 0);
            updateContainerSize();

            angular.element($window).resize(function() {
                $rootScope.$apply(updateContainerSize);
            });

            function updateContainerSize() {
                var width = notesContainer.width();
                var height = notesContainer.height();

                ContainerInfo.updateContainerSize(width, height);
            }

            notesContainer.on('mousemove', function($event) {
                $rootScope.$apply(function() {
                    callWithContainerOffset(
                        DragNoteService.pointerMove, $event.pageX, $event.pageY);

                    callWithContainerOffset(
                        ResizeService.pointerMove, $event.pageX, $event.pageY);
                });
            });

            notesContainer.on('mouseup', function($event) {
                $rootScope.$apply(function() {
                    callWithContainerOffset(
                        DragNoteService.pointerUp, $event.pageX, $event.pageY);

                    callWithContainerOffset(
                        ResizeService.pointerUp, $event.pageX, $event.pageY);
                });
            });

            notesContainer.on('mouseleave', function($event) {
                $rootScope.$apply(function() {
                    callWithContainerOffset(
                        DragNoteService.pointerLeave, $event.pageX, $event.pageY);

                    callWithContainerOffset(
                        ResizeService.pointerLeave, $event.pageX, $event.pageY); 
                });
            });

            function callWithContainerOffset(fn, pageX, pageY) {
                var containerOffset = pageOffsetToContainerOffset(pageX, pageY);
                fn(containerOffset.x, containerOffset.y);
            }

            function pageOffsetToContainerOffset(x,y) {
                var offset = notesContainer.offset();

                x -= offset.left;
                y -= offset.top;

                return { x:x, y:y };
            }
        }
    }

    notesContainerDirective.$inject = [
        '$rootScope',
        '$window',
        'utils', 
        'NotesService', 
        'DragNoteService',
        'ResizeService',
        'ContainerInfo'
    ]; 
                  
    angular
        .module('notesApp')
        .directive('notesContainer', notesContainerDirective);

})();
