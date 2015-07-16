(function() {
    'use strict';

    function NotesController($scope, NotesService, $window) {
        var vm = this;

        vm.NotesService = NotesService;

        vm.addNote = function() {
            NotesService.createNote();
        };
    }

    NotesController.$inject = ['$scope', 'NotesService', '$window'];

    angular
        .module('notesApp')
        .controller('NotesController', NotesController);
   
}());
