(function () {
  'use strict';

  angular
    .module('shared')
    .component('ttExperiencesPagination', {
      templateUrl: 'app/shared/components/experiences-pagination/experiences-pagination.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        experiences: '<'
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
      $ctrl.pagTotalItems = $ctrl.experiences.length;
      $ctrl.pagCurrentPage = 1;
      $ctrl.pagItemsPerPage = 1;
      $ctrl.pagMaxSize = 3;
      $ctrl.showWantBtn = false;
    }
  }

})();
