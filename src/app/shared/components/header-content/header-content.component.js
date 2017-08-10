(function () {
  'use strict';

  angular
    .module('shared')
    .component('ttHeaderContent', {
      templateUrl: 'app/shared/components/header-content/header-content.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      transclude: true,
      bindings: {
        titleText: '@',
        titleClass: '@',
        closeFunction: '&'
      }
    });

  /** @ngInject */
  function controller($log) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.titleText = $ctrl.titleText || "";
      $ctrl.titleClass = $ctrl.titleClass || "primary";
      $log.log($ctrl.closeFunction());
    }

    $ctrl.callCloseFunction = function () {
      if ($ctrl.closeFunction) {
        $ctrl.closeFunction()();
      }
    }
  }


})();
