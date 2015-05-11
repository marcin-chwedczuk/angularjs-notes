'use strict';

describe('Service: selectionUtils', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var selectionUtils;
  beforeEach(inject(function (_selectionUtils_) {
    selectionUtils = _selectionUtils_;
  }));

  it('should do something', function () {
    expect(!!selectionUtils).toBe(true);
  });

});
