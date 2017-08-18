(function () {
  'use strict';

  angular
    .module('shared')
    .component('ttProjectsPagination', {
      templateUrl: 'app/shared/components/projects-pagination/projects-pagination.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        projects: '<'
      }
    })
    .filter('start', function() {
      return function (input,start) {
        if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);
      };
    });

  /** @ngInject */
  function controller($log) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.pagTotalItems = $ctrl.projects.length;
      $ctrl.pagCurrentPage = 1;
      $ctrl.pagItemsPerPage = 1;
      $ctrl.pagMaxSize = 3;
      $ctrl.showWantBtn = false;

      $log.log("[DEBUG] projects: ", $ctrl.projects);
    }
  }

})();
