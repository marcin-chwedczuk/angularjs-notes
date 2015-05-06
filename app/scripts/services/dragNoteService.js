(function() {
    'use strict';

    function DragNoteService($log, NotesService) {
        var MODE_NORMAL = 'NORMAL',
            MODE_DRAG = 'DRAG';

        var mode, dragInfo;

        reset();

        return {
            reset: reset,

            pointerDown: pointerDown,
            pointerUp: pointerUp,
            pointerMove: pointerMove,

            pointerLeave: pointerLeave,

            isDraggingNote: isDraggingNote
        };

        function reset() {
            mode = MODE_NORMAL;

            dragInfo = {
                note: null,
                mousex: 0, mousey: 0,
                top: 0, left: 0
            };
        }

        function pointerDown(x, y) {
            if (isDraggingNote()) {
                return;
            }

            var note = NotesService.getNoteByPoint(x, y);
            if (note) {
                NotesService.bringNoteToFront(note);

                mode = MODE_DRAG;
                dragInfo = {
                    note: note,
                    dy: (note.top - y),
                    dx: (note.left - x)
                };

                $log.debug('DRAG START!');
            }
        }

        function pointerUp(x, y) {
            if (!isDraggingNote()) {
                return;
            }

            updateNotePosition(x, y);

            dragInfo = null;
            mode = MODE_NORMAL;

            $log.debug('DRAG STOP!');
        }

        function pointerMove(x, y) {
            if (isDraggingNote()) {
                updateNotePosition(x, y);
                $log.debug('x:', x, ' y:', y);
            }
        }

        function updateNotePosition(x, y) {
            var top = dragInfo.dy + y;
            var left = dragInfo.dx + x;
            dragInfo.note.setPosition(top, left);
        }

        function pointerLeave() {
            mode = MODE_NORMAL;
            dragInfo = null;
        }

        function isDraggingNote() {
            return (mode === MODE_DRAG);
        }
    }

    DragNoteService.$inject = ['$log', 'NotesService'];

    angular
        .module('notesApp')
        .factory('DragNoteService', DragNoteService);

})();
