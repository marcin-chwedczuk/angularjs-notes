(function() {
    'use strict';

    function documentEventsBoradcaster($document, $rootScope, $log) {
        $document.on('mousedown', function(e) {
            $log.log('document::mousedown ' + e);
            $rootScope.$broadcast('document_mousedown', e);
        });
    }

    documentEventsBoradcaster.$inject = ['$document', '$rootScope', '$log'];

    angular
        .module('notesApp')
        .run(documentEventsBoradcaster);
}());
