(function() {
    'use strict';

    angular
        .module('app.activity')
        .controller('ActivityListController', activityListController);

    activityListController.$inject = ['activities', 'deleteActivityModal'];
    function activityListController(activities, deleteActivityModal) {
      var vm = this;
      vm.activities = activities;
      vm.delete = deleteActivityModal.getDeleteMethod(vm.activities);
      console.log('activities: \n');
      console.log(angular.toJson(vm.activities));
    }
})();
