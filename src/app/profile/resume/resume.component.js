(function () {
  'use strict';

  angular
    .module('profile')
    .component('ttProfileResume', {
      templateUrl: 'app/profile/resume/resume.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        user: '<'
      }
    });

  /** @ngInject */
  function controller($log, $rootScope, $state, $uibModal, userDataService, ttGuiUtilService, ttDialogService) {
    var $ctrl = this;
    var changePasswordFormName = "changePasswordForm";
    var editProfileFormName = "editProfileForm";

    /**
     * Inicialização.
     */
    $ctrl.$onInit = function () {
      var changePasswordEventName = ttGuiUtilService.mountFormOperationEventName(changePasswordFormName);
      $ctrl.listenerPwd = $rootScope.$on(changePasswordEventName, function (event, data) {
        if (!data) return;
        ttGuiUtilService.showInfoMessage("Senha trocada", "Trocando senha de " + data.oldPassword + " para " + data.newPassword1);
      });

      var editProfileEventName = ttGuiUtilService.mountFormOperationEventName(editProfileFormName);
      $ctrl.listenerEdt = $rootScope.$on(editProfileEventName, function (event, data) {
        if (!data) return;
        ttGuiUtilService.showInfoMessage("Perfil Alterado", "Dados do usuário alterados com sucesso");
      });
    }

    /**
     * Destrutor
     */
    $ctrl.onDestroy = function () {
      $ctrl.listenerPwd();
      $ctrl.listenerEdt();
    }

    /**
     * Abertura de diálogo para editar perfil.
     */
    $ctrl.openEditProfile = function() {
      var user = $ctrl.user;
      ttDialogService.editProfile(user);
      //  $state.go("private.profile.edit");
    }

    /**
     * Abertura de diálogo para ver nuvem de competências
     */
    $ctrl.openCloud = function() {
      var user = $ctrl.user;
      ttDialogService.showCloud(user);
      // $state.go("private.profile.cloud");
   }

    /**
     * Abertura de diálogo de troca de senha.
     */
    $ctrl.openChangePassword = function () {
      var user = $ctrl.user;
      ttDialogService.changePassword(user);
      // $state.go("private.profile.change-password");  
     }
  }

})();
