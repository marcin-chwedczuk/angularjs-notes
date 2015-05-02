'use strict';

xdescribe('Directive: note', function () {

  // load the directive's module
  beforeEach(module('notesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<note></note>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the note directive');
  }));
});
