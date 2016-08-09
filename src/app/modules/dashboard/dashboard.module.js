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
          projects: ['projectResource',  function(projectResource) {
            return projectResource.query().$promise;
          }],
          digitalServices: ['digitalServiceResource', function(digitalServiceResource) {
            return digitalServiceResource.query().$promise;

          }],
          activities: ['activityResource', function(activityResource) {
            return activityResource.query().$promise;

          }]
        },
        controller: 'dashboardController',
        controllerAs: 'vm'
      });
  }
})();
