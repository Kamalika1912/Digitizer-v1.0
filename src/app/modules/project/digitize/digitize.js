(function() {
  'use strict';
  angular.module('app.profile').controller('DigitizeController', digitizeController);
  digitizeController.$inject = ['projects', 'projectResource', 'elements', 'digitalServices', '$state', 'shortHistory', 'notificator'];

  function digitizeController(projects, projectResource, elements, digitalServices, $state, shortHistory, notificator) {
    var vm = this;
    vm.project = projects;
    vm.element = elements;
    vm.services = digitalServices;
    vm.showReturnBtn = vm.project.id && shortHistory.from.state.name;
    vm.suggestedServices = vm.services;
    vm.suggestedServices = vm.services.filter(function(eachService) {
      for (var serviceKey in eachService.tags) {
        //console.log(eachService.tags[serviceKey].text);
        for (var elementKey in vm.project.elements){
          for (var tagKey in vm.project.elements[elementKey].tags) {
            //console.log(vm.project.elements[elementKey].tags[tagKey].text);
            if (eachService.tags[serviceKey].text === vm.project.elements[elementKey].tags[tagKey].text){
              return true;
            }
          }
        }

      }
      return false;
    });
    vm.project.services = vm.suggestedServices;
    console.log(vm.project.services);
    console.log(vm.project);
  }
})();
