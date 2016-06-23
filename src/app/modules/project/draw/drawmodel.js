(function(){
  'use strict';
  $('[data-toggle="tooltip"]').tooltip();
  $scope.reset = function(){
    $state.reload();
  };
})();
