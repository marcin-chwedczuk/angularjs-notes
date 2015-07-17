(function() {
    'use strict';

    function NotesNavbarController($scope, NotesService, Note) {
        var vm = this;

        vm.NotesService = NotesService;
        vm.colors = Note.COLORS;

        vm.setFrontNoteColor = function(color) {
            if (NotesService.frontNote) {
                NotesService.frontNote.setColor(color);
            }
        };

        vm.addNote = function() {
            NotesService.createNote();
        };
    }

    NotesNavbarController.$inject = ['$scope', 'NotesService', 'Note'];

    angular
        .module('notesApp')
        .controller('NotesNavbarController', NotesNavbarController);
   
}());
