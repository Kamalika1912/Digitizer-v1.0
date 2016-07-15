(function() {  'use strict';

  var module = angular.module('app.digitalService');

  module.service('deleteDigitalServiceModal', deleteDigitalServiceModal);

  deleteDigitalServiceModal.$inject = ['digitalServiceResource', 'commonModal', 'notificator'];
  function deleteDigitalServiceModal(digitalServiceResource, commonModal, notificator) {
    var that = this;
    this.modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Confirm service deletion',
      bodyText: 'The digital service will be deleted permanently, do you want to continue?'
    };
    this.modalDefaults = {
      windowClass: 'small-modal'
    };

    this.getDeleteMethod = function(digitalServices) {
      return function(digitalService) {
        commonModal.show(that.modalDefaults,that.modalOptions).then(function() {
          digitalServiceResource.delete(digitalService, function() {
            var index = digitalServices.indexOf(digitalService);
            digitalServices.splice(index,1);
            notificator.success('The digital service was successfully deleted');
          });
        });
      };
    };
  }
})();
