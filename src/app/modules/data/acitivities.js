(function() {  'use strict';

  angular.module('app.data')
    .factory('activityResource', activityResource)
    .factory('activityUtils', activityUtils);

  activityResource.$inject = ['$resource'];

  function activityResource($resource) {
    return $resource('/api/activities/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }

  activityUtils.$inject = ['activityResource'];
  function activityUtils(activityResource) {
    function activitiesDuringInterval(activities, days) {
      var today = new Date();
      var interval = 86400000 * days;
      var activityDuringInterval = [];
      activities.forEach(function(activity) {
        var activityDate = new Date(activity.date);
        today - activityDate < interval && activitiesDuringInterval.push(activity);
      });
      return activityDuringInterval;
    }

    function recent(activities, activitiesNum) {
      activities.sort(function(a, b) {
        if (a.date < b.date) return 1;
        else if (a.date == b.date) return 0;
        else return -1;
      });
      return activities.slice(0, activitiesNum || 1);
    }

    function lastEdited(activities) {
      var lastEdited = activities[0];
      activities.forEach(function(activity) {
        lastEdited = lastEdited.date < activity.date ? lastEdited : activity;
      });
      return lastEdited;
    }

    return {
      activitiesDuringInterval: activitiesDuringInterval,
      lastEdited: lastEdited,
      recent: recent
    }
  }
})();
