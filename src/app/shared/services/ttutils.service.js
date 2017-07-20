(function () {
  'use strict';

  angular
    .module('shared')
    .factory('ttUtilService', service)
    .controller('CpController', CpController)
    .config(toastConfig);


  /** @ngInject */
  function toastConfig(toastrConfig) {
    angular.extend(toastrConfig, {
      autoDismiss: false,
      maxOpened: 10,
      newestOnTop: true,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      closeButton: true,
      closeHtml: '<span class="fa fa-times"></span>',
      progressBar: false
    });
  }

      /** ngInject */
    function CpController($log, $scope, $uibModalInstance, project, projects) {
          var vm = this;
          vm.project = project;
          vm.projects = projects;
          vm.cancel = function () {
            $uibModalInstance.dismiss();
          }
          vm.confirm = function () {
            $log.log("Confirm: ", vm.project);
            $uibModalInstance.close(vm.project);
          }
    }

  /** @ngInject */
  function service($uibModal, $log, toastr, projectDataService) {
    var formOperationEventName = "FORM_OP_EV_NAME";

    return {
      showMessage: showMessage,
      showInfoMessage: showInfoMessage,
      showErrorMessage: showErrorMessage,
      confirmWarningMessage: confirmWarningMessage,
      runFormOperation: runFormOperation,
      isFormOperationEventName: isFormOperationEventName,
      mountFormOperationEventName: mountFormOperationEventName,
      chooseProject: chooseProject
    }

    function isFormOperationEventName(eventName, formName) {
      return eventName.equals(mountFormOperationEventName(formName));
    }

    function mountFormOperationEventName(formName) {
      return "__" + formOperationEventName + "_" + formName;
    }




    function chooseProject(inProject) {
      var cancelText = "Cancelar";
      var confirmText = "Confirmar";
      var title = "Projetos";
      $log.log("Entrada: ", inProject);
      var modalInstance = $uibModal.open({
        animation: true,
        size: "sm",
        controllerAs: '$ctrl',
        controller: function(objProject, projects) {
           var $ctrl = this;
          $ctrl.objProject = objProject;
          $ctrl.projects = projects;
          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.confirm = function () {
            $log.log("Confirm: ", $ctrl.objProject.project.getId());
            modalInstance.close($ctrl.objProject.project);
          }
        },
        resolve: {
            objProject: function() { return { project: inProject }; },
            projects: projectDataService.list()
        },
        template: '<div class="modal-header"><h1 class="text-info">' + title + '</h1></div>' +
          '<div class="modal-body">' +
          '<tt-project-chooser projects="$ctrl.projects" obj-project="$ctrl.objProject"></tt-project-chooser>' +
          '</div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-default" type="button" ng-click="$ctrl.cancel()">' + cancelText + '</button>' +
          '<button class="btn btn-primary" type="button" ng-click="$ctrl.confirm()">' + confirmText + '</button>' +
          '</div>'
      });
      return modalInstance.result;
    }

    /**
     * Mostra mensagem de popup na tela
     *
     * @param {string} text texto a ser exibido.
     */
    function showMessage(title, text) {
      var modalInstance = $uibModal.open({
        animation: true,
        controller: function () {
          var $ctrl = this;
          $ctrl.ok = function () {
            modalInstance.close();
          }
        },
        controllerAs: '$ctrl',
        template: '<div class="modal-header"><h1>' + title + '</h1></div>' +
          '<div class="modal-body">' +
          text +
          '</div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-primary" type="button" ng-click="$ctrl.ok()">OK</button>' +
          '</div>'
      });
      modalInstance.result.then(function () {}, function () {});
    }

    /**
     * Mostra mensagem de popup na tela
     *
     * @param {string} title título.
     * @param {string} text texto a ser exibido.
     * @param {string} confirmText texto a ser exibido no botão de confirmação da operação.
     * @param {string} cancelText texto a ser exibido no botão de cancelamento da operação.
     * @returns uma promessa sobre a confirmação (aceita se o usuário confirmar e rejeitada se desistir)
     */
    function confirmWarningMessage(title, text, confirmText, cancelText) {
      cancelText = cancelText || "Cancelar";
      confirmText = confirmText || "Confirmar";
      title = title || "Atenção";
      var modalInstance = $uibModal.open({
        animation: true,
        controller: function () {
          var $ctrl = this;
          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.confirm = function () {
            modalInstance.close();
          }
        },
        controllerAs: '$ctrl',
        template: '<div class="modal-header"><h1 class="text-info"><span class="fa fa-warning text-danger"></span> - ' + title + '</h1></div>' +
          '<div class="modal-body">' +
          text +
          '</div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-default" type="button" ng-click="$ctrl.cancel()">' + cancelText + '</button>' +
          '<button class="btn btn-danger" type="button" ng-click="$ctrl.confirm()">' + confirmText + '</button>' +
          '</div>'
      });
      return modalInstance.result;
    }


    /**
     * Mostra componente de operações com popup na tela, enviando evento quando a operação é concluída.
     * @param {object} $rootScope.
     * @param {string} formName, nome do formulário.
     * @param {string} title título.
     * @param {string} html texto html do componente a ser exibido.
     * @param {string} confirmText texto a ser exibido no botão de confirmação da operação.
     * @param {string} cancelText texto a ser exibido no botão de cancelamento da operação.
     */
    function runFormOperation($rootScope, formName, data, title, html, confirmText, cancelText) {
      cancelText = cancelText || "Cancelar";
      confirmText = confirmText || "Confirmar";
      title = title || "";
      var modalInstance = $uibModal.open({
        size: 'lg',
        animation: true,
        controller: function () {
          var $ctrl = this;
          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.confirm = function () {
            modalInstance.close();
          }
        },
        controllerAs: '$ctrl',
        template: '<div class="modal-header"><h1>' + title + '</h1></div>' +
          '<div class="modal-body">' +
          html +
          '</div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-default" type="button" ng-click="$ctrl.cancel()">' + cancelText + '</button>' +
          '<button ng-disabled="' + formName + '.$invalid" class="btn btn-primary" type="button" ng-click="$ctrl.confirm()">' + confirmText + '</button>' +
          '</div>'
      });
      var promisse = modalInstance.result;
      promisse.then(function () {
        $rootScope.$emit(formOperationEventName, data);
      }, function () {
        $rootScope.$emit(formOperationEventName, null);
      });
    }

    /**
     * Mostra um mensagem informativa rápida para o usuário.
     * @param {string} title 
     * @param {string} text 
     */
    function showInfoMessage(title, text) {
      toastr.info(text, title);
    }

    /**
     * Mostra um mensagem de erro rápida para o usuário.
     * @param {string} title 
     * @param {string} text 
     */
    function showErrorMessage(title, text) {
      toastr.error(text, title);
    }

  }


})();
