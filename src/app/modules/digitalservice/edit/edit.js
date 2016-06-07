(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('DigitalServiceController', digitalServiceController);

  digitalServiceController.$inject = ['data', 'digitalServiceResource', '$state', 'shortHistory', 'notificator'];
  function digitalServiceController(data, digitalServiceResource, $state, shortHistory, notificator) {
    var vm = this;
    vm.digitalService = data;
    vm.showReturnBtn = vm.digitalService.id && shortHistory.from.state.name;

    vm.update = function() {
      vm.digitalService.date = (new Date()).toISOString();
      digitalServiceResource.update(vm.digitalService, function(p) {
        notificator.success('Digital Service was successfully updated')
      });
    };

    vm.return = function() {
        $state.go(shortHistory.from.state.name, shortHistory.from.params);
    };

    vm.save = function() {
      vm.digitalService.date = (new Date()).toISOString();
      digitalServiceResource.save(this.digitalService, function(savedDigitalService) {
        shortHistory.goTo('from');
        notificator.success('Digital Service was successfully saved')
      });
    };
  }

})();
