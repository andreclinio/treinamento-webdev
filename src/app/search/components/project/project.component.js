(function () {
    'use strict';
  
    angular
      .module('search')
      .component('ttSearchProject', {
        templateUrl: 'app/search/components/project/project.component.html',
        controller: controller,
        controllerAs: '$ctrl'
      });
  
    /** @ngInject */
    function controller($rootScope) {
      var $ctrl = this;
  
      $ctrl.update = function(skills) {
        $ctrl.skills = skills;
        var projects = [];
        
        // TODO
        $ctrl.projects = projects;
      }

      $ctrl.$onInit = function () {
        $ctrl.projects = [];
        $ctrl.update();
        $ctrl.listener = $rootScope.$on("search.updated", function(event, skills) {
            $ctrl.update(skills);
        });
      }
  
      $ctrl.$onDestroy = function () {
          $ctrl.listener();
      }
    
    }
  
  
  })();
  