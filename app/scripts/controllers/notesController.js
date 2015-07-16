(function() {
    'use strict';

    function NotesController($scope, NotesService) {
        var vm = this;

        vm.NotesService = NotesService;

        vm.addNote = function() {
            NotesService.createNote();
        };
    }

    NotesController.$inject = ['$scope', 'NotesService'];

    angular
        .module('notesApp')
        .controller('NotesController', NotesController);
   
}());
