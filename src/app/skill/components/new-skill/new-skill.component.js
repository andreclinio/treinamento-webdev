(function () {
    'use strict';
  
    angular
      .module('skill')
      .component('ttSkillNewSkill', {
        templateUrl: 'app/skill/components/new-skill/new-skill.component.html',
        controller: controller,
        controllerAs: '$ctrl'
      });
  
    /** @ngInject */
    function controller($rootScope, $log, $state, Skill, ttGuiUtilService, skillDataService) {
      var $ctrl = this;
  
      /**
       * Inicializador do componente
       */
      $ctrl.$onInit = function () {
        $ctrl.title = "";
        $ctrl.description = "";
      }
  
      /**
       * Destrutor
       */
      $ctrl.$onDestroy = function () {
      }
  
      $ctrl.addSkill = function () {
        var title = $ctrl.title;
        var description = $ctrl.description;
  
        try {
          var skill = new Skill(title);
          skill.setDescription(description);
 
          skillDataService.create(skill);
          var infoMsg = "Nova competência '" + title + "'inserida com sucesso."
          ttGuiUtilService.showInfoMessage(null, infoMsg);
          $state.go("private.skill.view");
        } catch (exception) {
          ttGuiUtilService.showErrorMessage(null, exception);
        }
      }
    }
  
  })();
  