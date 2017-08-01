(function () {
  'use strict';

  angular
    .module('skill')
    .component('ttSkillView', {
      templateUrl: 'app/skill/components/view/view.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        skills: '<'
      }
    });

  /** @ngInject */
  function controller($rootScope, skillDataService) {
    var $ctrl = this;

    /**
     * Inicializador
     */
    $ctrl.$onInit = function () {
      $ctrl.skills = [];
    }
    /**
     * Destrutor
     */
    $ctrl.$onDestroy = function () {
    }

    $ctrl.loadSkills = function(query) {
      return skillDataService.search(query);
    }

    $ctrl.update = function() {
      $rootScope.$emit("search.updated", null);
    }
  }


})();
