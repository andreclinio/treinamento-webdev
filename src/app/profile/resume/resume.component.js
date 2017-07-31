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
    function controller($log, $rootScope, ttGuiUtilService) {
      var $ctrl = this;
      var changePasswordFormName = "changePasswordForm";
      $ctrl.$onInit = function () {
        var eventName = ttGuiUtilService.mountFormOperationEventName(changePasswordFormName);
        $ctrl.listener = $rootScope.$on(eventName, function (event, data) {
          if (!data) return;
          ttGuiUtilService.showInfoMessage("Senha trocada", "Trocando senha de " + data.oldPassword + " para " + data.newPassword1);
        });
      }

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
        ttGuiUtilService.openForm($rootScope, changePasswordFormName, "Alteração de Senha", "<tt-profile-change-password></tt-profile-change-password>",
          errors, "Redefinir senha");
      }
    }

    })();
