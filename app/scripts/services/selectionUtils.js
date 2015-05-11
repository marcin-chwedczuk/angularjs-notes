(function() {
    'use strict';

    function SelectionUtils($document, $window) {
        return {
            getMouseEventCaretRange: getMouseEventCaretRange,
            selectRange: selectRange
        };

        // from: http://stackoverflow.com/a/18654865/1779504

        function getMouseEventCaretRange($event) {
            var range, x = $event.clientX, y = $event.clientY;
            
            // Try the simple IE way first
            var document = $document[0];

            if (document.body.createTextRange) {
                range = document.body.createTextRange();
                range.moveToPoint(x, y);
            }
            else if (typeof document.createRange !== 'undefined') {
                // Try Mozilla's rangeOffset and rangeParent properties,
                // which are exactly what we want
                
                if (typeof $event.rangeParent !== 'undefined') {
                    range = document.createRange();
                    range.setStart($event.rangeParent, $event.rangeOffset);
                    range.collapse(true);
                }
            
                // Try the standards-based way next
                else if (document.caretPositionFromPoint) {
                    var pos = document.caretPositionFromPoint(x, y);
                    range = document.createRange();
                    range.setStart(pos.offsetNode, pos.offset);
                    range.collapse(true);
                }
            
                // Next, the WebKit way
                else if (document.caretRangeFromPoint) {
                    range = document.caretRangeFromPoint(x, y);
                }
            }
            
            return range;
        }

        function selectRange(range) {
            if (range) {
                if (typeof range.select !== 'undefined') {
                    range.select();
                }
                else if (typeof $window.getSelection !== 'undefined') {
                    var sel = $window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
    }

    SelectionUtils.$inject = ['$document', '$window'];

    angular
        .module('notesApp')
        .factory('SelectionUtils', SelectionUtils);

})();
