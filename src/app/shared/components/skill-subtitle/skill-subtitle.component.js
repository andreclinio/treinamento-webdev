(function () {
  'use strict';

  angular
    .module('shared')
    .component('ttSkillSubtitle', {
      templateUrl: 'app/shared/components/skill-subtitle/skill-subtitle.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        title: '@'
      }
    });

  /** @ngInject */
  function controller() {
    var $ctrl = this;
    $ctrl.$onInit = function () {
    }

    $ctrl.$onDestroy = function () {
    }
  }
})();
