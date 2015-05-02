'use strict';

xdescribe('Service: note', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var note;
  beforeEach(inject(function (_note_) {
    note = _note_;
  }));

  it('should do something', function () {
    expect(!!note).toBe(true);
  });

});
