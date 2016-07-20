(function() {
  'use strict';

  angular.module('app.dashboard')
    .controller('dashboardController', dashboardController);

  dashboardController.$inject = ['$scope', '$sce', 'projects', 'projectsUtils', 'digitalServices', 'digitalServiceUtils', 'elements'];
  function dashboardController($scope, $sce, projects, projectsUtils, digitalServices, digitalServiceUtils, elements) {
    $scope.projects = projects;
    $scope.elements = elements;
    $scope.projectsLastMonth = projectsUtils.projectsDuringInterval(projects, 30);
    $scope.lastEditedProject = projectsUtils.lastEdited(projects);
    $scope.projectsRecently = projectsUtils.recent(projects, 5);
    $scope.digitalServices = digitalServices;
    $scope.digitalServicesRecently = digitalServiceUtils.recent(digitalServices, 4);
    $scope.alerts = [
      { type: 'warning', msg: $sce.trustAsHtml('<span class="fw-semi-bold">Warning:</span> Best check yo self, you\'re not looking too good.') },
      { type: 'success', msg: $sce.trustAsHtml('<span class="fw-semi-bold">Success:</span> You successfully read this important alert message.') },
      { type: 'info', msg: $sce.trustAsHtml('<span class="fw-semi-bold">Info:</span> This alert needs your attention, but it\'s not super important.') },
      { type: 'danger', msg: $sce.trustAsHtml('<span class="fw-semi-bold">Danger:</span> Change this and that and try again.'
      + '<a class="btn btn-default btn-xs pull-right mr" href="#">Ignore</a>'
      + '<a class="btn btn-danger btn-xs pull-right mr-xs" href="#">Take this action</a>') }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'warning', msg: $sce.trustAsHtml('Another alert!')});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }

})();
