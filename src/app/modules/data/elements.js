(function() {  'use strict';

  angular.module('app.data')
    .factory('elementResource', elementResource)
    .factory('elementUtils', elementUtils);

  elementResource.$inject = ['$resource'];

  function elementResource($resource) {
    return $resource('/api/elements/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }

  elementUtils.$inject = ['elementResource'];
  function elementUtils(elementResource) {
    function elementsDuringInterval(elements, days) {
      var today = new Date();
      var interval = 86400000 * days;
      var elementDuringInterval = [];
      elements.forEach(function(element) {
        var elementDate = new Date(element.date);
        today - elementDate < interval && elementsDuringInterval.push(element);
      });
      return elementDuringInterval;
    }

    function recent(elements, elementsNum) {
      elements.sort(function(a, b) {
        if (a.date < b.date) return 1;
        else if (a.date == b.date) return 0;
        else return -1;
      });
      return elements.slice(0, elementsNum || 1);
    }

    function lastEdited(elements) {
      var lastEdited = elements[0];
      elements.forEach(function(element) {
        lastEdited = lastEdited.date < element.date ? lastEdited : element;
      });
      return lastEdited;
    }

    return {
      elementsDuringInterval: elementsDuringInterval,
      lastEdited: lastEdited,
      recent: recent
    }
  }
})();
