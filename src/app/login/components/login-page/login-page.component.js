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
  function controller($log, $state, $window, $scope, userDataService, ttModelUtilService, ttGuiUtilService, ttLng) {
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
            var title = ttLng.get('login.error.title');
            var msg = ttLng.get('login.bad.error');
            ttGuiUtilService.showErrorMessage(title, msg);
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
          var title = ttLng.get('login.error.title');
          var msg = ttLng.get('login.no.user.error');
          ttGuiUtilService.showErrorMessage(title, msg);
        })
        .catch(function (ex) {
          ttGuiUtilService.showErrorMessage(null, ex);
        });
    }
  }


})();
