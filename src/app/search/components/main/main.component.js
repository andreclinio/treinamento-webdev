(function() {
    'use strict';
  
    angular
      .module('search')
      .component('ttSearchMain', {
        templateUrl: 'app/search/components/main/main.component.html',
        controller: controller,
        controllerAs: '$ctrl'
      });
  
    /** @ngInject */
    function controller($rootScope, $log, skillDataService) {
      var $ctrl = this;

      $ctrl.$onInit = function() {
        $ctrl.skills = [];
      }
  
      $ctrl.$onDestroy = function() {
      }

      $ctrl.loadSkills = function(query) {
        return skillDataService.search(query);
      }

      $ctrl.update = function() {
        $rootScope.$broadcast("search.updated", $ctrl.skills);
      }
    }
  
  })();
  