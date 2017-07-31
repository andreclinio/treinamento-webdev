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
  function controller($log, $state, ttGuiUtilService, ttModelUtilService, userDataService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
    }

    $ctrl.onDestroy = function () {
    }

    $ctrl.recover = function () {
      var email = $ctrl.email;
      var prm = userDataService.get(email);
      prm.then(function () {
        var msg = "<p> Foi enviado um e-mail para '"+ email + "' com instruções para a recuperação e/ou redefinição de sua senha." +
        "<p>Ao receber este e-mail, siga a instruções."
        ttGuiUtilService.showMessage("Recuperação se Senha", msg);
        $state.go("private.profile.view");
        }, function () {
          ttGuiUtilService.showErrorMessage("Erro", "Usuário '" + email + "' não cadastrado no sistema!");
        })
        .catch(function (ex) {
          ttGuiUtilService.showErrorMessage(null, ex);
        });
    }
    
  }

})();
