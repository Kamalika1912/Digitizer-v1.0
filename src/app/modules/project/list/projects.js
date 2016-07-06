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
      for (var projectKey in vm.projects){
        for (var serviceKey in vm.projects[projectKey].services) {

            console.log(vm.projects[projectKey].services[serviceKey].id);

        }
      }

    }
})();
