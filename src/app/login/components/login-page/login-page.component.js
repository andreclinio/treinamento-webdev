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
  function controller($log, $state, $cookies, userDataService, ttModelUtilService, ttGuiUtilService) {
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
    }

    $ctrl.onDestroy = function () {

    }

    $ctrl.login = function () {
      var email = $ctrl.email;
      var password = $ctrl.password;
      var prm = userDataService.get(email);
      prm.then(function () {
        if (!ttModelUtilService.checkPassword(email, password)) {
          ttGuiUtilService.showErrorMessage("Falha de Login", "Senha inválida para o usuário!");
          return;
        }
        $state.go("private.profile.view");
        if ($ctrl.remember) {
          $cookies.put(cookieEmail, email);
          $cookies.put(cookiePassword, password);
        }
      }, function () {
          ttGuiUtilService.showErrorMessage("Falha de Login", "Usuário não cadastrado no sistema!");
      })
      .catch(function (ex) {
          ttGuiUtilService.showErrorMessage(null, ex);
      });
    }
  }


})();
