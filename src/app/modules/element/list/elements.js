(function() {
    'use strict';

    angular
        .module('app.element')
        .controller('ElementListController', elementListController);

    elementListController.$inject = ['elements', 'deleteElementModal'];
    function elementListController(elements, deleteElementModal) {
      var vm = this;
      vm.elements = elements;
      vm.delete = deleteElementModal.getDeleteMethod(vm.elements);
    }
})();
