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
  function controller($log, $state, $window, ttUtilService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      var email = $window.localStorage.tt_login_email;
      var password = $window.localStorage.tt_login_password;

      if (email) $ctrl.email = email;
      if (password) $ctrl.password = password;
    }

    $ctrl.onDestroy = function () {}

    $ctrl.login = function () {
      var email = $ctrl.email;
      var password = $ctrl.password;
      if (email == "clinio@tecgraf.puc-rio.br" && password == "1234") {
        $state.go("private.profile.view");
        if ($ctrl.remember) {
          $window.localStorage.tt_login_email = email;
          $window.localStorage.tt_login_password = password;
        }
      } else {
        ttUtilService.showErrorMessage("Falha de Login", "Dados de usuário/senha inválidos!");
      }
    }

  }

})();
