(function() {
    'use strict';
  
    angular
      .module('profile')
      .component('ttProfileChangePassword', {
        templateUrl: 'app/profile/change-password/change-password.component.html',
        controller: controller,
        controllerAs: '$ctrl',
        bindings: {
          user: '<'
        }
      });
  
    /** @ngInject */
    function controller($log) {
      var $ctrl = this;
      $ctrl.$onInit = function() {
      }
  
      $ctrl.onDestroy = function() {
      }

      $ctrl.changePassword = function() {

      }

      $ctrl.showHidePassword = function() {
        var widget1 = angular.element("#oldPassword")[0];
        var widget2 = angular.element("#newPassword1")[0];
        var widget3 = angular.element("#newPassword2")[0];
        if (!widget1 || !widget2 || !widget3) {
          $log.log("Falha no widget de senha em login");
          return;
        }
  
        if ($ctrl.showPassword) {
          widget1.type = "text";
          widget2.type = "text";
          widget3.type = "text";
        } else {
          widget1.type = "password";
          widget2.type = "password";
          widget3.type = "password";
        }
      }
    }
  
  })();
  