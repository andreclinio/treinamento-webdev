(function() {
    'use strict';
  
    angular
      .module('skill')
      .component('ttSkillEdit', {
        templateUrl: 'app/skill/components/edit/edit.component.html',
        controller: controller,
        controllerAs: '$ctrl',
        bindings: {
          skills: '<'
        }
      });
  
    /** @ngInject */
    function controller($rootScope, $log) {
      var $ctrl = this;

      $ctrl.$onInit = function() {
        $ctrl.skills = [];
      }
  
      $ctrl.$onDestroy = function() {
      }

      $ctrl.update = function() {
      }
    }
  
  })();
  