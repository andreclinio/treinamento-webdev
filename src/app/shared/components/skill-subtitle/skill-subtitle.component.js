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
  function controller($log, ttModelUtilService, ttGuiUtilService) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.title = $ctrl.title || "Legenda para Níveis de Competência";
      $ctrl.levels = [];
      for (var i = 0; i < 3; i++) {
        var obj = {};
        obj.text = ttModelUtilService.getSkillLevelName(i+1);
        obj.class = ttGuiUtilService.getTextClassForSkillLevel(i+1);
        $ctrl.levels.push(obj);
      } 
      $log.log($ctrl.levels);
    }

    $ctrl.$onDestroy = function () {
    }
  }
})();
