(function () {
  'use strict';

  angular
    .module('login')
    .component('ttLoginPage', {
      templateUrl: 'app/login/components/login-page/login-page.component.html',
      controller: controller,
      controllerAs: '$ctrl'
    });

  /** @ngInject */
  function controller($log, $state, $cookies, $scope, userDataService, ttModelUtilService, ttGuiUtilService) {
    var $ctrl = this;
    var cookieEmail = "__TT_EMAIL_COOKIE";
    var cookiePassword = "__TT_PASSWORD_COOKIE";

    $ctrl.$onInit = function () {
      var email = $cookies.get(cookieEmail);
      var password = $cookies.get(cookiePassword);

      if (email && password) {
        $ctrl.email = email;
        $ctrl.password = password;
        $ctrl.remember = true;
      }

      $ctrl.showPassword = false;
    }

    $ctrl.onDestroy = function () {}

    $ctrl.showHidePassword = function () {
      var widget = angular.element("#password")[0];
      if (!widget) {
        $log.log("Falha no widget de senha em login");
        return;
      }

      if ($ctrl.showPassword) {
        widget.type = "text";
      } else {
        widget.type = "password";
      }
    }

    $ctrl.login = function () {
      var email = $ctrl.email;
      var password = $ctrl.password;
      var prm = userDataService.get(email);
      prm.then(function () {
          if (!ttModelUtilService.checkPassword(email, password)) {
            ttGuiUtilService.showErrorMessage("Falha de Login", "Senha errada para o usuário!");
            return;
          }
          $state.go("private.profile.view");
          if ($ctrl.remember) {
            $cookies.put(cookieEmail, email);
            $cookies.put(cookiePassword, password);
          } else {
            $cookies.remove(cookieEmail);
            $cookies.remove(cookiePassword);
          }
        }, function () {
          ttGuiUtilService.showErrorMessage("Falha de Login", "Usuário '" + email + "' não cadastrado no sistema!");
        })
        .catch(function (ex) {
          ttGuiUtilService.showErrorMessage(null, ex);
        });
    }
  }


})();
