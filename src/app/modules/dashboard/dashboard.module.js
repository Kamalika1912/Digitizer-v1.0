(function() {  'use strict';

  var module = angular.module('app.dashboard', ['ui.router', 'ngResource', 'app.data']);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/modules/dashboard/dashboard.html',
        resolve: {
          projects: ['projectResource', 'digitalServiceResource', function(projectResource, digitalServiceResource) {
            return projectResource.query().$promise;
          }],
          digitalServices: ['projectResource', 'digitalServiceResource', function(projectResource, digitalServiceResource) {
            return digitalServiceResource.query().$promise;

    }]
        },
        controller: 'dashboardController',
        controllerAs: 'vm'
      });
  }
})();
