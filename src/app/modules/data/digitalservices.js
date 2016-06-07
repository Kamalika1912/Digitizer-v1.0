(function() {  'use strict';

  angular.module('app.data')
    .factory('digitalServiceResource', digitalServiceResource)
    .factory('digitalServiceUtils', digitalServiceUtils);

  digitalServiceResource.$inject = ['$resource'];

  function digitalServiceResource($resource) {
    return $resource('/api/digitalservices/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }

  digitalServiceUtils.$inject = ['digitalServiceResource'];
  function digitalServiceUtils(digitalServiceResource) {
    function digitalServicesDuringInterval(digitalServices, days) {
      var today = new Date();
      var interval = 86400000 * days;
      var digitalServiceDuringInterval = [];
      digitalServices.forEach(function(digitalService) {
        var digitalServiceDate = new Date(digitalService.date);
        today - digitalServiceDate < interval && digitalServicesDuringInterval.push(digitalService);
      });
      return digitalServiceDuringInterval;
    }

    function recent(digitalServices, digitalServicesNum) {
      digitalServices.sort(function(a, b) {
        if (a.date < b.date) return 1;
        else if (a.date == b.date) return 0;
        else return -1;
      });
      return digitalServices.slice(0, digitalServicesNum || 1);
    }

    function lastEdited(digitalServices) {
      var lastEdited = digitalServices[0];
      digitalServices.forEach(function(digitalService) {
        lastEdited = lastEdited.date < digitalService.date ? lastEdited : digitalService;
      });
      return lastEdited;
    }

    return {
      digitalServicesDuringInterval: digitalServicesDuringInterval,
      lastEdited: lastEdited,
      recent: recent
    }
  }
})();
