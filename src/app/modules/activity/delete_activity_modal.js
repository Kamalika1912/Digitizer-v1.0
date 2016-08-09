(function() {  'use strict';

  var module = angular.module('app.activity');

  module.service('deleteActivityModal', deleteActivityModal);

  deleteActivityModal.$inject = ['activityResource', 'commonModal', 'notificator'];
  function deleteActivityModal(activityResource, commonModal, notificator) {
    var that = this;
    this.modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Confirm activity deletion',
      bodyText: 'The activity will be deleted permanently, do you want to continue?'
    };
    this.modalDefaults = {
      windowClass: 'small-modal'
    };

    this.getDeleteMethod = function(activities) {
      return function(activity) {
        commonModal.show(that.modalDefaults,that.modalOptions).then(function() {
          activityResource.delete(activity, function() {
            var index = activities.indexOf(activity);
            activities.splice(index,1);
            notificator.success('The activity was successfully deleted');
          });
        });
      };
    };
  }
})();
