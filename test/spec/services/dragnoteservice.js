'use strict';

describe('Service: DragNoteService', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var DragNoteService;
  beforeEach(inject(function (_DragNoteService_) {
    DragNoteService = _DragNoteService_;
  }));

  it('should do something', function () {
    expect(!!DragNoteService).toBe(true);
  });

});
