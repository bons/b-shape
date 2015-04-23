'use strict';

require('angular');
require('angular-mocks');
var app = require('../lib/b-shape');

describe('Test Suite: bShape', function()
{
  var scope,
      $compile;

  function injectHTML()
  {
    var body  = document.querySelector("body");
    body.innerHTML = '<canvas b-shape type="circle" width="100px" percent="30"  height="100px"></canvas><canvas b-shape type="circle" width="100px" height="100px"></canvas>';

    $compile(body)(scope);

    return body.querySelector("[b-shape]");
  }

  beforeEach(angular.mock.module('bons.bShape'));

  beforeEach(angular.mock.inject(['$rootScope','$compile',
      function ($rootScope, _$compile)
      {
        scope = $rootScope.$new();
        $compile = _$compile;
      }
    ])
  );

  it('should be defined', function()
  {
    expect(app).toBeDefined();
  });

  it('', function()
  {
    injectHTML();
  });
});
