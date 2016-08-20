(function() {  'use strict';

  var module = angular.module('app.project', ['ui.router', 'ngResource', 'app.data', 'app.common']);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.projects', {
        url: '/projects/:interval',
        templateUrl: 'app/modules/project/list/projects.html',
        resolve: {
          projects: ['$stateParams', 'projectsUtils', 'projectResource', function($stateParams, projectsUtils, projectResource) {
            return projectResource.query().$promise.then(function(allProjects) {
              return $stateParams.interval ? projectsUtils.projectsDuringInterval(allProjects, $stateParams.interval) : allProjects;
            });
          }]
        },
        controller: 'ProjectListController as vm'
      })
      .state('app.editProject', {
        url: '/projects/edit/:id',
        templateUrl: 'app/modules/project/edit/edit.html',
        resolve: {
          projects: ['$stateParams', 'projectResource', function($stateParams, projectResource) {
            return $stateParams.id ? projectResource.get({id: $stateParams.id}).$promise : {};
          }],
          activities: ['activityResource', function(activityResource) {
            return activityResource.query().$promise;
          }]
        },
        controller: 'ProjectController',
        controllerAs: 'vm'
      })
      .state('app.model', {
        url: '/projects/model/:id',
        templateUrl: 'app/modules/project/edit/model.html',
        resolve: {
          projects: ['$stateParams', 'projectResource', function($stateParams, projectResource) {
            return $stateParams.id ? projectResource.get({id: $stateParams.id}).$promise : {};
          }],
          activities: ['activityResource', function(activityResource) {
            return activityResource.query().$promise;
          }]
        },
        controller: 'ProjectController',
        controllerAs: 'vm'
      })
      .state('app.digitize', {
        url: '/projects/digitize/:id',
        templateUrl: 'app/modules/project/digitize/digitize.html',
        resolve: {
          projects: ['$stateParams', 'projectResource', function($stateParams, projectResource) {
            return $stateParams.id ? projectResource.get({id: $stateParams.id}).$promise : {};
          }],
          activities: ['activityResource', function(activityResource) {
            return activityResource.query().$promise;
          }],
          digitalServices: ['$stateParams', 'digitalServiceUtils', 'digitalServiceResource', function($stateParams, digitalServiceUtils, digitalServiceResource) {
            return digitalServiceResource.query().$promise.then(function(allDigitalServices) {
              return $stateParams.interval ? digitalServiceUtils.digitalServicesDuringInterval(allDigitalServices, $stateParams.interval) : allDigitalServices;
            });
          }]
        },
        controller: 'DigitizeController',
        controllerAs: 'vm'
      })
  .state('app.digitizedBPM', {
      url: '/projects/digitize/digitizedBPM/:id',
      templateUrl: 'app/modules/project/digitize/digitizedBPM.html',
      resolve: {
        projects: ['$stateParams', 'projectResource', function($stateParams, projectResource) {
          return $stateParams.id ? projectResource.get({id: $stateParams.id}).$promise : {};
        }],
        activities: ['activityResource', function(activityResource) {
          return activityResource.query().$promise;
        }],
        digitalServices: ['$stateParams', 'digitalServiceUtils', 'digitalServiceResource', function($stateParams, digitalServiceUtils, digitalServiceResource) {
          return digitalServiceResource.query().$promise.then(function(allDigitalServices) {
            return $stateParams.interval ? digitalServiceUtils.digitalServicesDuringInterval(allDigitalServices, $stateParams.interval) : allDigitalServices;
          });
        }]
      },
      controller: 'DigitizeController',
      controllerAs: 'vm'
    });
  }
})();
