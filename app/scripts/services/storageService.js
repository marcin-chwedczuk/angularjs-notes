(function() {
    'use strict';

    function StorageService($window, Note, utils, $log) {
        var NOTES_KEY = '[notes]';

        return {
            saveNotes: saveNotes,
            loadNotes: loadNotes
        };

        function saveNotes(notesArray) {
            var json = JSON.stringify(notesArray);
            save(NOTES_KEY, json);
        }

        function loadNotes() {
            var notesJson = load(NOTES_KEY);
            
            if (!notesJson) {
                return [];
            }

            try {
                var notesArray = JSON.parse(notesJson);
                
                for (var i = 0; i < notesArray.length; i += 1) {
                    var noteData = notesArray[i];
                    var note = new Note(noteData.id);

                    utils.copyProperties(note, noteData);

                    notesArray[i] = note;
                }

                return notesArray;
            }
            catch(ex) {
                $log.error('Cannot load notes from local storage: ' + ex);
                return [];
            }
        }

        function save(key, value) {
            assertBrowserSupportLocalStorage();

            $window.localStorage.setItem(key, value);
        }

        function load(key) {
            assertBrowserSupportLocalStorage();

            return $window.localStorage.getItem(key);
        }

        function assertBrowserSupportLocalStorage() {
            if (!$window.localStorage) {
                throw new Error('This application requires a browser that ' +
                                'supports localStorage feature.');
            }
        }
    }

    StorageService.$inject = ['$window', 'Note', 'utils', '$log'];

    angular
        .module('notesApp')
        .factory('StorageService', StorageService);

}());
