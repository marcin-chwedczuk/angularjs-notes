(function() {
    'use strict';

    function NotesController(NotesService, $window) {
        var vm = this;

        NotesService.createNote();
        $window.notes = vm.notes = NotesService.getAllNotes();

        vm.addNote = function() {
            NotesService.createNote();
            vm.notes = NotesService.getAllNotes();
        };
    }

    NotesController.$inject = ['NotesService', '$window'];

    angular
        .module('notesApp')
        .controller('NotesController', NotesController);
   
}());
