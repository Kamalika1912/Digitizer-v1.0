(function() {  'use strict';

  var module = angular.module('app.element');

  module.service('newElementModal', newElementModal);

  newElementModal.$inject = ['elementResource', 'commonModal', 'notificator'];
  function newElementModal(elementResource, commonModal, notificator) {
    var that = this;
    this.modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Adding new element',
      bodyText: 'Element Creation'
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
            notificator.success('The element was successfully created');
          });
        });
      };
    };
  }
})();
