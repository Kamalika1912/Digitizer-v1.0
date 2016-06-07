(function() {  'use strict';

  angular.module('app.data')
    .factory('projectResource', projectResource)
    .factory('projectsUtils', projectsUtils);

  projectResource.$inject = ['$resource'];

  function projectResource($resource) {
    return $resource('/api/projects/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }

  projectsUtils.$inject = ['projectResource'];
  function projectsUtils(projectResource) {
    function projectsDuringInterval(projects, days) {
      var today = new Date();
      var interval = 86400000 * days;
      var projectsDuringInterval = [];
      projects.forEach(function(project) {
        var projectDate = new Date(project.date);
        today - projectDate < interval && projectsDuringInterval.push(project);
      });
      return projectsDuringInterval;
    }

    function recent(projects, projectsNum) {
      projects.sort(function(a, b) {
        if (a.date < b.date) return 1;
        else if (a.date == b.date) return 0;
        else return -1;
      });
      return projects.slice(0, projectsNum || 1);
    }

    function lastEdited(projects) {
      var lastEdited = projects[0];
      projects.forEach(function(project) {
        lastEdited = lastEdited.date < project.date ? lastEdited : project;
      });
      return lastEdited;
    }

    return {
      projectsDuringInterval: projectsDuringInterval,
      lastEdited: lastEdited,
      recent: recent
    }
  }
})();
