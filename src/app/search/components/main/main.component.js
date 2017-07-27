(function() {
    'use strict';
  
    angular
      .module('search')
      .component('ttSearchMain', {
        templateUrl: 'app/search/components/main/main.component.html',
        controller: controller,
        controllerAs: '$ctrl',
        bindings: {
        }
      });
  
    /** @ngInject */
    function controller() {
      var $ctrl = this;
      $ctrl.$onInit = function() {
      }
  
      $ctrl.onDestroy = function() {
      }
    }
  
  })();
  