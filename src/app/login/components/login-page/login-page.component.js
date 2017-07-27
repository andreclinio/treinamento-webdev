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
  function controller($log, $state, $window, userDataService, ttModelUtilService, ttGuiUtilService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      var email = $window.localStorage.tt_login_email;
      var password = $window.localStorage.tt_login_password;

      if (email) $ctrl.email = email;
      if (password) $ctrl.password = password;
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
          $window.localStorage.tt_login_email = email;
          $window.localStorage.tt_login_password = password;
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
