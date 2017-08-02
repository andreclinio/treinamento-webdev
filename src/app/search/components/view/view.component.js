(function() {
    'use strict';
  
    angular
      .module('search')
      .component('ttSearchView', {
        templateUrl: 'app/search/components/view/view.component.html',
        controller: controller,
        controllerAs: '$ctrl',
        bindings: {
            user: '<'
        }
      });
  
    /** @ngInject */
    function controller() {
      var $ctrl = this;
      $ctrl.$onInit = function() {
      }
  
      $ctrl.$onDestroy = function() {
      }
    }
  
  })();
  