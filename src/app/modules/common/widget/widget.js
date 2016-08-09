(function() {
  'use strict';

  angular.module('app.common')
    .directive('widget', widget);

  function widget() {
    function link(scope, $activity) {
      $activity.addClass('widget');
    }
    return {
      link: link,
      restrict: 'EA'
    };
  }

})();
