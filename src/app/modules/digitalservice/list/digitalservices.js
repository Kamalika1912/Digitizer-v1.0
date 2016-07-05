(function() {
    'use strict';

    angular
        .module('app.digitalService')
        .controller('DigitalServiceListController', digitalServiceListController);

    digitalServiceListController.$inject = ['digitalServices', 'deleteDigitalServiceModal'];
    function digitalServiceListController(digitalServices, deleteDigitalServiceModal) {
      var vm = this;
      vm.digitalServices = digitalServices;
      vm.delete = deleteDigitalServiceModal.getDeleteMethod(vm.digitalServices);
      console.log(vm.digitalServices[0].tags[0].text);
      for (var service in vm.digitalServices) {
        for (var tag in service.tags) {
          console.log(service.tags[tag]);
        }
      }
    }
})();
