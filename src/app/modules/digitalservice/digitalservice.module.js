(function() {  'use strict';

  var module = angular.module('app.digitalService', ['ui.router', 'ngResource', 'app.data', 'app.common']);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.digitalServices', {
        url: '/digitalservices/:interval',
        templateUrl: 'app/modules/digitalservice/list/digitalservices.html',
        resolve: {
          digitalServices: ['$stateParams', 'digitalServiceUtils', 'digitalServiceResource', function($stateParams, digitalServiceUtils, digitalServiceResource) {
            return digitalServiceResource.query().$promise.then(function(allDigitalServices) {
              return $stateParams.interval ? digitalServiceUtils.digitalServicesDuringInterval(allDigitalServices, $stateParams.interval) : allDigitalServices;
            });
          }]
        },
        controller: 'DigitalServiceListController as vm'
      })
      .state('app.editDigitalService', {
        url: '/digitalservices/edit/:id',
        templateUrl: 'app/modules/digitalservice/edit/edit.html',
        resolve: {
          data: ['$stateParams', 'digitalServiceResource', function($stateParams, digitalServiceResource){
            return $stateParams.id ? digitalServiceResource.get({id: $stateParams.id}).$promise : {};
          }]
        },
        controller: 'DigitalServiceListController',
        controllerAs: 'vm'
      });
  }
})();
