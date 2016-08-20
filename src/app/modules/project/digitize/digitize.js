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
    vm.suggestedServices = [];
    //vm.suggestedServices = vm.services;
    for (var activityKey in vm.project.activities){
      vm.suggestedServices.push({});
    }

    if (vm.project.services == []) {
      for (var activityKey in vm.project.activities) {
        vm.project.services.push(' ');
      }
    }
    console.log(vm.project.services);
    for (var activityKey in vm.project.activities){
      vm.suggestedServices[activityKey] = vm.services.filter(function(eachService) {
        for (var serviceKey in eachService.tags) {
            for (var tagKey in vm.project.activities[activityKey].tags) {
            //console.log(eachService.tags[serviceKey].text);
              if (eachService.tags[serviceKey].text === vm.project.activities[activityKey].tags[tagKey].text || eachService.tags[serviceKey].text == 'no service'){
                return true;
              }
            }
        }
        return false;
      });
      vm.suggestedServices[activityKey].push(vm.services[0]);
      //console.log(vm.suggestedServices[activityKey]);
      //console.log(vm.services[0]);
    }
    //console.log(vm.suggestedServices);
    for (var serviceKey in vm.suggestedServices) {
      for (var tagKey in vm.suggestedServices.tags) {
        console.log(vm.suggestedServices[serviceKey].tags[tagKey].text);
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
      if (vm.project.services.length <= vm.project.activities.length){
        projectResource.update(vm.project, function(p) {
          notificator.success('Digitized Model was successfully saved');
        });
      }
      else (
        notificator.warning('Services exceeding model activities')
      )
    };

  }
})();
