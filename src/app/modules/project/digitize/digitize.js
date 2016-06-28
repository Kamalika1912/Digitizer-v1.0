(function() {
  'use strict';
  angular
    .module('app.profile')
    .controller('DigitizeController', digitizeController);
  digitizeController.$inject = ['projects', 'projectResource', 'elements', 'digitalServices', '$state', 'shortHistory', 'notificator'];

  function digitizeController(projects, projectResource, elements, digitalServices, $state, shortHistory, notificator) {
    var vm = this;
    vm.project = projects;
    vm.element = elements;
    vm.services = digitalServices;
    vm.showReturnBtn = vm.project.id && shortHistory.from.state.name;
  }
})();
