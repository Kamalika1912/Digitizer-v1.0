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
    }
})();
