(function() {
  'use strict';
  angular.module('app.profile').controller('ProjectController', projectController);
  projectController.$inject = ['projects', 'projectResource', 'activities', '$state', 'shortHistory', 'notificator'];

  function projectController(projects, projectResource, activities, $state, shortHistory, notificator) {
    var vm = this;
    vm.project = projects;
    vm.activity = activities;
    vm.showReturnBtn = vm.project.id && shortHistory.from.state.name;
    vm.update = function() {
      vm.project.date = (new Date()).toISOString();
      projectResource.update(vm.project, function(p) {
        notificator.success('Project was successfully updated');
      });
    };
    vm.return = function() {
      $state.go(shortHistory.from.state.name, shortHistory.from.params);
    };
    vm.undo = function() {
      vm.project.activities.splice(-1,1);
    };
    vm.reset = function() {
      vm.project.activities = [];
    };
    vm.save = function() {
      vm.project.date = (new Date()).toISOString();
      vm.project.activities = [];
      vm.project.services = [];
      projectResource.save(this.project, function(savedProject) {
        notificator.success('Project was successfully saved');
        $state.go('app.projects');
      });
    };
  }
})();
