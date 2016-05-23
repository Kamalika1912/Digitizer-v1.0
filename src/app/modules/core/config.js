(function() {
  'use strict';

  var core = angular.module('app.core');

  var config = {
    name: 'Digitizer ',
    appTitle: 'Digitizer',
    version: '1.1.1'
  };

  core.value('config', config);
})();
