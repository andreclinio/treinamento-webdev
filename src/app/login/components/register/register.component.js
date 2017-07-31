(function () {
  'use strict';

  angular
    .module('login')
    .component('ttRegister', {
      templateUrl: 'app/login/components/register/register.component.html',
      controller: controller,
      controllerAs: '$ctrl'
    });

  /** @ngInject */
  function controller($log, $state, ttGuiUtilService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
    }

    $ctrl.onDestroy = function () {
    }

    /**
     * Mostra/esconde as senhas digitadas pelo usuário na tela.
     */
    $ctrl.showHidePassword = function () {
      var widget1 = angular.element("#password")[0];
      var widget2 = angular.element("#password2")[0];
      if (!widget1 || !widget2) {
        $log.log("Falha no widget de senha em login");
        return;
      }

      if ($ctrl.showPassword) {
        widget1.type = "text";
        widget2.type = "text";
      } else {
        widget1.type = "password";
        widget2.type = "password";
      }
    }

    /**
     * Função que executa o registro.
     */
    $ctrl.register = function () {
      var email = $ctrl.email;
      if ($ctrl.exists(email)) {
         ttGuiUtilService.showErrorMessage("Registro", "Já existe usuário cadastrado com esse email!");
         return;
      }
      
      var msg = "<p>Para completar seu registro, " + 
      "verifique a confirmação que foi enviada para o seu email:" + 
      "<ul><li>" + email + "</li></ul>.";
      
      ttGuiUtilService.showMessage("Registro no Sistema", msg);
      $state.go("public.login");
    }

    $ctrl.exists = function(email) {
      if (email == "clinio@tecgraf.puc-rio.br") return true;
      return false;
    }

  }

})();
