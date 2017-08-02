(function () {
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
  function controller($state, userDataService, ttGuiUtilService) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.options = [{
          text: "Cancelar",
          callback: $ctrl.cancel
        },
        {
          text: "Alterar",
          class: "primary",
          callback: $ctrl.changePassword
        }
      ]
    }


    $ctrl.cancel = function () {
      $state.go("private.profile.view");
    }

    $ctrl.$onDestroy = function () {
    }

    $ctrl.changePassword = function () {
      var name = $ctrl.user.getName();

      try {
        userDataService.update($ctrl.user);
        var infoMsg = "Atualização de senha do usuário " + name + " feita com sucesso."
        ttGuiUtilService.showInfoMessage(null, infoMsg);
        $state.go("private.profile.view");
      } catch (exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      }


    }

    $ctrl.showHidePassword = function () {
      var widget1 = angular.element("#oldPassword")[0];
      var widget2 = angular.element("#newPassword1")[0];
      var widget3 = angular.element("#newPassword2")[0];
      if (!widget1 || !widget2 || !widget3) {
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
