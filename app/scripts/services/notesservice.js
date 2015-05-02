(function() {
    'use strict';

    function NotesService(Note) {
        var NOT_FOUND = (-1);

        var nextId, notes;

        reset();

        return {
            reset: reset,

            createNote: createNote,
            deleteNote: deleteNote,
            getAllNotes: getAllNotes,

            bringNoteToFront: bringNoteToFront
        };

        function reset() {
            nextId = 1;
            notes = [];
        }

        function createNote() {
            var note = new Note(nextId++);
            notes.push(note);

            bringNoteToFront(note);

            return note;
        }

        function deleteNote(noteOrId) {
            var noteIndex = getNoteIndex(noteOrId);

            if (noteIndex === NOT_FOUND) {
                return false;
            }
            else {
                notes.splice(noteIndex, 1);
                return true;
            }
        }

        function bringNoteToFront(noteOrId) {
            var note = getNote(noteOrId);
            if (note === null) {
                throw new Error('Cannot find note.');
            }
            
            var maxZIndex = getMaxZIndex();
            note.setZIndex(maxZIndex + 1);

            recomputeZIndexes();
        }

        function getMaxZIndex() {
            var maxZIndex = (-1);

            for (var i = 0; i < notes.length; i += 1) {
                maxZIndex = Math.max(maxZIndex, notes[i].zIndex);
            }

            return maxZIndex;
        }

        function recomputeZIndexes() {
            notes.sort(function(leftNote, rightNote) {
                return (leftNote.zIndex - rightNote.zIndex);
            });

            for (var i = 0; i < notes.length; i += 1) {
                notes[i].setZIndex(i + 1);
            }
        }

        function getAllNotes() {
            return notes.slice();
        }

        function getNoteIndex(noteOrId) {
            var id = (angular.isNumber(noteOrId) ? noteOrId : noteOrId.id);

            for (var i = 0; i < notes.length; i += 1) {
                if (notes[i].hasId(id)) {
                    return i;
                }
            }

            return (-1);
        }

        function getNote(noteOrId) {
            var noteIndex = getNoteIndex(noteOrId);

            if (noteIndex === NOT_FOUND) {
                return null;
            }
            else {
                return notes[noteIndex];
            }
        }
    }

    NotesService.$inject = ['Note'];

    angular
        .module('notesApp')
        .factory('NotesService', NotesService);

})();