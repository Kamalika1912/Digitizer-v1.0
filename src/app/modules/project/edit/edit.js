(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProjectController', projectController);

  projectController.$inject = ['data', 'projectResource', '$state', 'shortHistory', 'notificator'];
  function projectController(data, projectResource, $state, shortHistory, notificator) {
    var vm = this;
    vm.project = data;
    vm.showReturnBtn = vm.project.id && shortHistory.from.state.name;

    vm.update = function() {
      vm.project.date = (new Date()).toISOString();
      projectResource.update(vm.project, function(p) {
        notificator.success('Project was successfully updated')
      });
    };

    vm.return = function() {
        $state.go(shortHistory.from.state.name, shortHistory.from.params);
    };

    vm.save = function() {
      vm.project.date = (new Date()).toISOString();
      projectResource.save(this.project, function(savedProject) {
        shortHistory.goTo('from');
        notificator.success('Project was successfully saved')
      });
    };
  }

})();
