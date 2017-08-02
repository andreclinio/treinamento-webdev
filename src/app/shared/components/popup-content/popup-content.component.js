(function () {
  'use strict';

  angular
    .module('shared')
    .component('ttPopupContent', {
      templateUrl: 'app/shared/components/popup-content/popup-content.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      transclude: true,
      bindings: {
        titleText: '@',
        titleClass: '@',
        closeFunction: '&',
        options: '<'
      }
    });

  /** @ngInject */
  function controller() {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.titleText = $ctrl.titleText || "";
      $ctrl.titleClass = $ctrl.titleClass || "primary";
      $ctrl.options = $ctrl.options || [];
    }

    $ctrl.callCloseFunction = function () {
      if ($ctrl.closeFunction) {
        $ctrl.closeFunction()();
      }
    }
  }


})();
