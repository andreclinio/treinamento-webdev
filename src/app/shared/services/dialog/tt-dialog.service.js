(function () {
  'use strict';

  angular
    .module('shared')
    .factory('ttDialogService', service);

  /** @ngInject */
  function service($log, $uibModal, ttGuiUtilService, userDataService) {
    return {
      changePassword: changePassword,
      showCloud: showCloud
    };

    /**
     * Abertura de diálogo de troca de senha.
     */
    function changePassword(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        size: 'sm',
        controllerAs: '$ctrl',
        controller: function () {
          var $ctrl = this;
          $ctrl.user = user;
          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.showHidePassword = function() {
            var widget1 = angular.element("#oldPassword")[0];
            var widget2 = angular.element("#newPassword1")[0];
            var widget3 = angular.element("#newPassword2")[0];
            if (!widget1 || !widget2 || !widget3) {
              return;
            }
            if ($ctrl.showPassword) {
              widget1.type = "text";
              widget2.type = "text";
              widget3.type = "text";
            } else {
              widget1.type = "password";
              widget2.type = "password";
              widget3.type = "password";
            }
          }
          $ctrl.changePassword = function () {
            modalInstance.close({
              old: $ctrl.oldPassword,
              new: $ctrl.newPassword1
            });
          }
        },
        templateUrl: "app/shared/services/dialog/change-password.html"
      });

      modalInstance.result.then(function (passwords) {
        var oldPwd = passwords.old;
        var newPwd = passwords.new;

        var name = user.getName();
        // TODO
        $log.log(oldPwd, newPwd);
        try {
          userDataService.update(user);
          var infoMsg = "Atualização de senha do usuário " + name + " feita com sucesso."
          ttGuiUtilService.showInfoMessage(null, infoMsg);
          modalInstance.dismiss();
        } catch (exception) {
          ttGuiUtilService.showErrorMessage(null, exception);
        }
      }, function () {}).catch(function (error) {
        ttGuiUtilService.showErrorMessage(null, error);
      });
    }

    /**
     * Abertura de diálogo de troca de senha.
     */
    function showCloud(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        size: 'lg',
        controllerAs: '$ctrl',
        controller: function () {
          var $ctrl = this;
          $ctrl.user = user;
          $ctrl.close = function () {
            modalInstance.dismiss();
          }
        },
        templateUrl: "app/shared/services/dialog/show-cloud.html"
      });
      modalInstance.result.then(function () {}, function () {});
    }


  }


})();
