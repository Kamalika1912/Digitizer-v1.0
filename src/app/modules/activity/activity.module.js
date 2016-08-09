(function() {  'use strict';

  var module = angular.module('app.activity', ['ui.router', 'ngResource', 'app.data', 'app.common']);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.activities', {
        url: '/activities/:interval',
        templateUrl: 'app/modules/activity/list/activities.html',
        resolve: {
          activities: ['$stateParams', 'activityUtils', 'activityResource', function($stateParams, activityUtils, activityResource) {
            return activityResource.query().$promise.then(function(allactivities) {
              return $stateParams.interval ? activityUtils.activitiesDuringInterval(allactivities, $stateParams.interval) : allactivities;
            });
          }]
        },
        controller: 'ActivityListController as vm'
      })
      .state('app.editActivity', {
        url: '/activities/edit/:id',
        templateUrl: 'app/modules/activity/edit/edit.html',
        resolve: {
          data: ['$stateParams', 'activityResource', function($stateParams, activityResource){
            return $stateParams.id ? activityResource.get({id: $stateParams.id}).$promise : {};
          }]
        },
        controller: 'ActivityController',
        controllerAs: 'vm'
      });
  }
})();
