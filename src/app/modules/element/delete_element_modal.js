(function() {  'use strict';

  var module = angular.module('app.element');

  module.service('deleteElementModal', deleteElementModal);

  deleteElementModal.$inject = ['elementResource', 'commonModal', 'notificator'];
  function deleteElementModal(elementResource, commonModal, notificator) {
    var that = this;
    this.modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Confirm project deletion',
      bodyText: 'The digital service will be deleted permanently, do you want to continue?'
    };
    this.modalDefaults = {
      windowClass: 'small-modal'
    };

    this.getDeleteMethod = function(elements) {
      return function(element) {
        commonModal.show(that.modalDefaults,that.modalOptions).then(function() {
          elementResource.delete(element, function() {
            var index = elements.indexOf(element);
            elements.splice(index,1);
            notificator.success('The digital service was successfully deleted');
          });
        });
      };
    };
  }
})();
