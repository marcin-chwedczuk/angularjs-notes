(function() {
    'use strict';

    function ResizeService($log, NotesService) {
        var MODE_NORMAL = 'NORMAL', 
            MODE_RESIZE = 'RESIZE';

        var MIN_WIDTH = 200,
            MIN_HEIGHT = 160;

        var resizeInfo = null;
        var mode = MODE_NORMAL;

        return {
            pointerDown: pointerDown,
            pointerMove: pointerMove,
            pointerUp: pointerUp,
            pointerLeave: pointerLeave,

            isResizingNote: isResizingNote
        };

        function pointerDown(x, y) {
            if (isResizingNote()) {
                return;
            }

            var note = NotesService.getNoteByPoint(x, y);
            if (note) {
                NotesService.bringNoteToFront(note);

                mode = MODE_RESIZE;
                resizeInfo = {
                    note: note,
                    dwidth: (note.width - x),
                    dheight: (note.height - y)
                };

                $log.debug('RESIZE START!');
            }
        }

        function pointerMove(x, y) {
            if (isResizingNote()) {
                updateNoteSize(x, y);
                $log.debug('x:', y, 'y:', y);
            }
        }

        function pointerUp(x, y) {
            stopResize(x, y);
        }

        function pointerLeave(x, y) {
            stopResize(x, y);
        }

        function stopResize(x, y) {
            if (!isResizingNote()) {
                return;
            }

            updateNoteSize(x, y);

            resizeInfo = null;
            mode = MODE_NORMAL;

            $log.debug('RESIZE STOP!');
        }

        function updateNoteSize(x, y) {
            var width = Math.max(MIN_WIDTH, resizeInfo.dwidth + x);
            var height = Math.max(MIN_HEIGHT, resizeInfo.dheight + y);

            resizeInfo.note.setSize(width, height);
        }

        function isResizingNote() {
            return (mode === MODE_RESIZE);
        }
    }

    ResizeService.$inject = ['$log', 'NotesService'];

    angular
        .module('notesApp')
        .factory('ResizeService', ResizeService);
  
})();
