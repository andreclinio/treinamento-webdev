(function() {
    'use strict';
  
    angular
      .module('global')
      .component('ttGlobalView', {
        templateUrl: 'app/global/components/view/view.component.html',
        controller: controller,
        controllerAs: '$ctrl'
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
  