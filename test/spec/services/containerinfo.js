'use strict';

describe('Service: containerInfo', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var containerInfo;
  beforeEach(inject(function (_containerInfo_) {
    containerInfo = _containerInfo_;
  }));

  it('should do something', function () {
    expect(!!containerInfo).toBe(true);
  });

});
