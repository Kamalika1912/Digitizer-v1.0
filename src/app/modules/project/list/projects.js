(function() {
    'use strict';

    angular
        .module('app.project')
        .controller('ProjectListController', projectListController);

    projectListController.$inject = ['projects', 'deleteProjectModal'];
    function projectListController(projects, deleteProjectModal) {
      var vm = this;
      vm.projects = projects;
      vm.delete = deleteProjectModal.getDeleteMethod(vm.projects);
      console.log('Projects: \n');
      console.log(angular.toJson(vm.projects));
    }
})();
