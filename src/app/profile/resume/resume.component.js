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
  function controller($log, $rootScope, $state, ttGuiUtilService) {
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

    $ctrl.openEditProfile = function() {
       $state.go("private.profile.edit");
    }

    /**
     * Abertura de diálogo de edição de perfil.
     */
    $ctrl._openEditProfile = function () {
      var errors = [{
          field: 'name',
          directive: 'required',
          alert: 'warning',
          message: 'O campo nome é obrigatório'
        },
        {
          field: 'lattes',
          directive: 'url',
          alert: 'warning',
          message: 'URL inválida para Lattes'
        },
        {
          field: 'linkedin',
          directive: 'url',
          alert: 'warning',
          message: 'URL inválida para LinkedIn'
        }
      ];

      var inputs = [{
          field: 'name',
          value: $ctrl.user.getName()
        },
        {
          field: 'email',
          value: $ctrl.user.getEmail()
        },
        {
          field: 'lattes',
          value: $ctrl.user.getLattes()
        },
{
          field: 'linkedin',
          value: $ctrl.user.getLinkedIn()
        }
      ];

      var descriptor = {
        inputs: inputs,
        errors: errors
      };
      ttGuiUtilService.openForm($rootScope, editProfileFormName, "Alteração de Perfil", "<tt-profile-edit></tt-profile-edit>",
        descriptor, "Alterar perfil");

    }

    /**
     * Abertura de diálogo de troca de senha.
     */
    $ctrl.openChangePassword = function () {
      var errors = [{
          field: 'oldPassword',
          directive: 'required',
          alert: 'danger',
          message: 'A senha atual deve ser inserida!'
        },
        {
          field: 'newPassword1',
          directive: 'ttpasswordcheckgood',
          alert: 'warning',
          message: 'Nova senha deve ter oito caracteres com números e maiúsculas'
        },
        {
          field: 'newPassword2',
          directive: 'ttfieldcheckequal',
          alert: 'warning',
          message: 'Nova senha e confirmação diferem!'
        }
      ];

      var descriptor = {
        inputs: [],
        errors: errors
      };
      ttGuiUtilService.openForm($rootScope, changePasswordFormName, "Alteração de Senha", "<tt-profile-change-password></tt-profile-change-password>",
        descriptor, "Redefinir senha");
    }
  }

})();
