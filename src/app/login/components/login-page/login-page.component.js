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
  function controller($log, $state, $window, $scope, userDataService, ttModelUtilService, ttGuiUtilService, ttI18N) {
    var $ctrl = this;
    var cookieEmail = "__TT_EMAIL_COOKIE";
    var cookiePassword = "__TT_PASSWORD_COOKIE";
    var $localStorage = $window.localStorage;

    $ctrl.$onInit = function () {
      var email = $localStorage[cookieEmail];
      var password = $localStorage[cookiePassword];

      if (email && password) {
        $ctrl.email = email;
        $ctrl.password = password;
        $ctrl.remember = true;
      }
      else {
        $ctrl.email = "";
        $ctrl.password = "";
        $ctrl.remember = false;
      }

      $ctrl.showPassword = false;
    }

    $ctrl.setLng = function(lng) {
       ttI18N.setLanguage(lng);
    }

    $ctrl.getLng = function() {
      return ttI18N.getLanguage();
    }

    $ctrl.getLngIcon = function(lng) {
      var name = ttI18N.getIconNameFor(lng);
      return name;
    }

    $ctrl.getAllLngs = function() {
      return ttI18N.getAllSupportedLanguages();
    }

    $ctrl.onDestroy = function () {
    }

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
            $localStorage[cookieEmail] = email;
            $localStorage[cookiePassword] = password;
          } else {
            delete $localStorage[cookieEmail];
            delete $localStorage[cookiePassword];
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
