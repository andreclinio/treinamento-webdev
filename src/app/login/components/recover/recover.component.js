(function () {
  'use strict';

  angular
    .module('login')
    .component('ttRecover', {
      templateUrl: 'app/login/components/recover/recover.component.html',
      controller: controller,
      controllerAs: '$ctrl'
    });

  /** @ngInject */
  function controller($log, $state, ttUtilService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
    }

    $ctrl.onDestroy = function () {
    }

    $ctrl.recover = function () {
      var email = $ctrl.email;
    }
    
  }

})();
