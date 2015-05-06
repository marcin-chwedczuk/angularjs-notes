'use strict';

xdescribe('Service: ResizeService', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var ResizeService;
  beforeEach(inject(function (_ResizeService_) {
    ResizeService = _ResizeService_;
  }));

  it('should do something', function () {
    expect(!!ResizeService).toBe(true);
  });

});
