(function () {
  'use strict';

  angular
    .module('shared')
    .component('ttLng', {
      templateUrl: 'app/shared/components/lng/lng.component.html',
      controller: controller,
      controllerAs: '$ctrl'
    });

  /** @ngInject */
  function controller(ttLng) {
    var $ctrl = this;
    $ctrl.$onInit = function () {}

    $ctrl.setLng = function (lng) {
      ttLng.setLanguage(lng);
    }

    $ctrl.getLng = function () {
      return ttLng.getLanguage();
    }

    $ctrl.getLngIcon = function (lng) {
      var name = ttLng.getIconNameFor(lng);
      return 'assets/images/lng/' + name;
    }

    $ctrl.getAllLngs = function () {
      return ttLng.getAllSupportedLanguages();
    }

  }


})();
