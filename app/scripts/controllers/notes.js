(function() {
    'use strict';

    function NotesController(NotesService) {
        var vm = this;

        NotesService.createNote();
        vm.notes = NotesService.getAllNotes();

        vm.addNote = function() {
            NotesService.createNote();
            vm.notes = NotesService.getAllNotes();
            vm.notes[0].top = 555;
        };
    }

    NotesController.$inject = ['NotesService'];

    angular
        .module('notesApp')
        .controller('NotesController', NotesController);
   
}());
