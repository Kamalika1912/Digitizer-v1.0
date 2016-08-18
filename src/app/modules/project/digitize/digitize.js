(function() {
  'use strict';
  angular.module('app.profile').controller('DigitizeController', digitizeController);
  digitizeController.$inject = ['projects', 'projectResource', 'activities', 'digitalServices', '$state', 'shortHistory', 'notificator'];

  function digitizeController(projects, projectResource, activities, digitalServices, $state, shortHistory, notificator) {
    var vm = this;
    vm.project = projects;
    vm.activity = activities;
    vm.services = digitalServices;
    vm.showReturnBtn = vm.project.id && shortHistory.from.state.name;
    var suggestedServices = [];
    //vm.suggestedServices = vm.services;
    for (var activityKey in vm.project.activities){
      suggestedServices.push({});
    }
    console.log(suggestedServices);

    for (var activityKey in vm.project.activities){
      suggestedServices[activityKey] = vm.services.filter(function(eachService) {
        for (var serviceKey in eachService.tags) {
            for (var tagKey in vm.project.activities[activityKey].tags) {
            //console.log(eachService.tags[serviceKey].text);
              if (eachService.tags[serviceKey].text === vm.project.activities[activityKey].tags[tagKey].text){
                return true;
              }
            }
        }
        return false;
      });
      console.log(suggestedServices[activityKey]);
    }
    for (var serviceKey in suggestedServices) {
      for (var tagKey in suggestedServices.tags) {
        console.log(suggestedServices[serviceKey].tags[tagKey].text);
      }
    }
    /*
    vm.suggestedServices = vm.services.filter(function(eachService) {

      for (var serviceKey in eachService.tags) {
        for (var activityKey in vm.project.activities){
          for (var tagKey in vm.project.activities[activityKey].tags) {
            //console.log(vm.project.activities[activityKey].tags[tagKey].text);
            if (eachService.tags[serviceKey].text === vm.project.activities[activityKey].tags[tagKey].text){
              return true;
            }
          }
        }

      }
      return false;
    });

    */

    vm.undo = function() {
      vm.project.services.splice(-1,1);
    };
    vm.refresh = function() {
      $state.reload();
    };
    vm.reset = function() {
      vm.project.services = [];
      $state.reload();
    };

    vm.update = function() {
      vm.project.date = (new Date()).toISOString();
      projectResource.update(vm.project, function(p) {
        notificator.success('Digitized Model was successfully saved');
      });
    };

  }
})();
