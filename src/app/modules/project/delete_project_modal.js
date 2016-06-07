(function() {  'use strict';

  var module = angular.module('app.project');

  module.service('deleteProjectModal', deleteProjectModal);

  deleteProjectModal.$inject = ['projectResource', 'commonModal', 'notificator'];
  function deleteProjectModal(projectResource, commonModal, notificator) {
    var that = this;
    this.modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Confirm project deletion',
      bodyText: 'The project will be deleted permanently, do you want to continue?'
    };
    this.modalDefaults = {
      windowClass: 'small-modal'
    };

    this.getDeleteMethod = function(projects) {
      return function(project) {
        commonModal.show(that.modalDefaults,that.modalOptions).then(function() {
          projectResource.delete(project, function() {
            var index = projects.indexOf(project);
            projects.splice(index,1);
            notificator.success('Project was successfully deleted');
          });
        });
      };
    };
  }
})();
