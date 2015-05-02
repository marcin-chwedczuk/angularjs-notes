(function() {
    'use strict';

    function DragNoteService($log, NotesService) {
        var MODE_NORMAL = 'NORMAL',
            MODE_DRAG = 'DRAG';

        var mode, dragInfo, containerInfo;

        reset();

        return {
            reset: reset,
            setcontainerInfoSize: setcontainerInfoSize,

            // coords are relative to containerInfo
            pointerDown: pointerDown,
            pointerUp: pointerUp,
            pointerMove: pointerMove,

            pointerLeave: pointerLeave
        };

        function reset() {
            mode = MODE_NORMAL;

            dragInfo = {
                note: null,
                mousex: 0, mousey: 0,
                top: 0, left: 0
            };

            containerInfo = {
                top: 0, left: 0,
                width: 0, height: 0,
                bottom: 0, right: 0
            };
        }

        function setcontainerInfoSize(top, left, width, height) {
            var isN = angular.isNumber.bind(angular);

            if (!isN(top) || !isN(left) || !isN(width) || !isN(height)) {
                throw new TypeError('Contaner dimensions must be numbers.');
            }

            containerInfo = { 
                top: top,
                left: left,
                width: width,
                height: height,
                bottom: (top + height),
                right: (left + width)
            };
        }

        function pointerDown(x, y) {
            if (mode === MODE_DRAG) {
                return;
            }

            var note = getNoteByPoint(x, y);
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
            if (mode !== MODE_DRAG) {
                return;
            }

            updateNotePosition(x, y);

            dragInfo = null;
            mode = MODE_NORMAL;

            $log.debug('DRAG STOP!');
        }

        function pointerMove(x, y) {
            if (mode === MODE_DRAG) {
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

        function getNoteByPoint(x, y) {
            var notes = NotesService.getAllNotes();
            var note = null;

            for (var i = 0; i < notes.length; i += 1) {
                if (notes[i].containsPoint(x, y) && (!note || (notes[i].zIndex >= note.zIndex))) {
                    note = notes[i];
                }
            }

            return note;
        }
    }

    DragNoteService.$inject = ['$log', 'NotesService'];

    angular
        .module('notesApp')
        .factory('DragNoteService', DragNoteService);

})();
