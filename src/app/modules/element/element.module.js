(function() {  'use strict';

  var module = angular.module('app.element', ['ui.router', 'ngResource', 'app.data', 'app.common']);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.elements', {
        url: '/elements/:interval',
        templateUrl: 'app/modules/element/list/elements.html',
        resolve: {
          elements: ['$stateParams', 'elementUtils', 'elementResource', function($stateParams, elementUtils, elementResource) {
            return elementResource.query().$promise.then(function(allElements) {
              return $stateParams.interval ? elementUtils.elementsDuringInterval(allElements, $stateParams.interval) : allElements;
            });
          }]
        },
        controller: 'ElementListController as vm'
      })
      .state('app.editElement', {
        url: '/elements/edit/:id',
        templateUrl: 'app/modules/element/edit/edit.html',
        resolve: {
          data: ['$stateParams', 'elementResource', function($stateParams, elementResource){
            return $stateParams.id ? elementResource.get({id: $stateParams.id}).$promise : {};
          }]
        },
        controller: 'ElementController',
        controllerAs: 'vm'
      });
  }
})();
