(function () {
  'use strict';

  angular
    .module('shared')
    .component('ttSkillSubtitle', {
      templateUrl: 'app/shared/components/skill-subtitle/skill-subtitle.component.html',
      controller: controller,
      controllerAs: '$ctrl'
    });

  /** @ngInject */
  function controller($log, ttModelUtilService, ttGuiUtilService) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.levels = [];
      for (var i = 2; i >= 0; i--) {
        var obj = {};
        obj.text = ttModelUtilService.getSkillLevelName(i+1);
        obj.class = ttGuiUtilService.getTextClassForSkillLevel(i+1);
        $ctrl.levels.push(obj);
      } 
    }

    $ctrl.$onDestroy = function () {
    }
  }
})();
