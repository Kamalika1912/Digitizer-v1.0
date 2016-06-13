(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ElementController', elementController);

  elementController.$inject = ['data', 'elementResource', '$state', 'shortHistory', 'notificator'];
  function elementController(data, elementResource, $state, shortHistory, notificator) {
    var vm = this;
    vm.element = data;
    vm.showReturnBtn = vm.element.id && shortHistory.from.state.name;

    vm.update = function() {
      vm.element.date = (new Date()).toISOString();
      elementResource.update(vm.element, function(p) {
        notificator.success('Element was successfully updated')
      });
    };

    vm.return = function() {
        $state.go(shortHistory.from.state.name, shortHistory.from.params);
    };

    vm.save = function() {
      vm.element.date = (new Date()).toISOString();
      elementResource.save(this.element, function(savedElement) {
        shortHistory.goTo('from');
        notificator.success('Element was successfully saved')
      });
    };
  }

})();
