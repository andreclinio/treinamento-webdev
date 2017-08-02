(function () {
  'use strict';

  angular
    .module('shared')
    .factory('ttGuiUtilService', service)
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

  /** @ngInject */
  function service($uibModal, $log, $sce, toastr, projectDataService, ttModelUtilService) {
    return {
      showMessage: showMessage,
      showInfoMessage: showInfoMessage,
      showErrorMessage: showErrorMessage,
      confirmWarningMessage: confirmWarningMessage,
      runFormOperation: runFormOperation,
      isFormOperationEventName: isFormOperationEventName,
      mountFormOperationEventName: mountFormOperationEventName,
      chooseProject: chooseProject,
      chooseDate: chooseDate,
      chooseString: chooseString,
      getTextClassForSkillLevel: getTextClassForSkillLevel,
      getBadgeClassForSkillLevel: getBadgeClassForSkillLevel,
      getHtmlForSkillLevel: getHtmlForSkillLevel
    }

   
    function _buildStdOptions(confirmText, cancelText, confirmCallback, cancelCallback) {
      cancelText = cancelText || "Cancelar";
      confirmText = confirmText || "Confirmar";
      return [
        { text: cancelText, class: "default", callback: cancelCallback },
        { text: confirmText, class: "primary", callback: confirmCallback}
      ]
    }

    function _buildOkOptions(okText, okCallback) {
      okText = okText || "Fechar";
      return [
        { text: okText, class: "primary", callback: okCallback }
      ]
    }

    function _buildTemplate(titleText, titleClass, content) {
      content = $sce.trustAsHtml(content);
      titleClass = titleClass || "primary";
      titleText = titleText || "";
      return '<tt-popup-content title-text="' + titleText + '" title-class="' + titleClass + '" options="$ctrl.options" close-function="$ctrl.cancel">' + content + '</tt-popup-content>';
    }

    function getTextClassForSkillLevel(level) {
      if (level == 1) {
        return "tt-text-skill-basic";
      } else if (level == 2) {
        return "tt-text-skill-medium";
      } else if (level == 3) {
        return "tt-text-skill-advanced";
      } else {
        return "";
      }
    }

    function getBadgeClassForSkillLevel(level) {
      if (level == 1) {
        return "tt-badge-skill-basic";
      } else if (level == 2) {
        return "tt-badge-skill-medium";
      } else if (level == 3) {
        return "tt-badge-skill-advanced";
      } else {
        return "";
      }
    }

    function getHtmlForSkillLevel(level, text) {
      return "<span class='" + getBadgeClassForSkillLevel(level) + "'>" + $sce.trustAsHtml(text) + "</span>";
    }

    function isFormOperationEventName(eventName, formName) {
      return eventName.equals(mountFormOperationEventName(formName));
    }

    function mountFormOperationEventName(formName) {
      var formOperationEventName = "FORM_OP_EV_NAME";
      return "__" + formOperationEventName + "_" + formName;
    }

    function chooseDate(title, text, date) {
      title = title || "Data";
      text = text || "Escolha uma data";
      date = ttModelUtilService.stringToDate(date);
      var content = '<div uib-datepicker ng-model="$ctrl.date" class="" formats="[MM/yyyy]" datepicker-options="{minMode: \'month\'}" datepicker-mode="\'month\'" id="date"></div>'

      var modalInstance = $uibModal.open({
        animation: true,
        size: "sm",
        controllerAs: '$ctrl',
        controller: function () {
          var $ctrl = this;
          $ctrl.date = date;
          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.confirm = function () {
            var dtTxt = ttModelUtilService.dateToString($ctrl.date);
            modalInstance.close(dtTxt);
          }
          $ctrl.options = _buildStdOptions(null, null, $ctrl.confirm, $ctrl.cancel);
        },
        template: _buildTemplate(title, null, '<p>' + text + '</p>' + content)
      });
      return modalInstance.result;
    }

    function chooseString(title, text, string, multi) {
      title = title || "Texto";
      text = text || "Escolha o texto associado";
      multi = multi || false;

      var widget = '<input type="text" ng-model="$ctrl.string" class="form-control" id="string"></input>';
      var sz = "sm";
      if (multi) {
        widget = '<textarea ng-model="$ctrl.string" class="form-control" id="string"></textarea>';
        sz = "md";
      }
      var content = '<p>'+text+'</p>' + widget;

      var modalInstance = $uibModal.open({
        animation: true,
        size: sz,
        controllerAs: '$ctrl',
        controller: function () {
          var $ctrl = this;
          $ctrl.string = string;
          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.confirm = function () {
            modalInstance.close($ctrl.string);
          }
          $ctrl.options = _buildStdOptions(null, null, $ctrl.confirm, $ctrl.cancel);
        },
        template: _buildTemplate(title, null, content)
      });
      return modalInstance.result;
    }

    function chooseProject(inProject) {
      var content = '<tt-project-chooser projects="$ctrl.projects" obj-project="$ctrl.objProject"></tt-project-chooser>';
      var title = "Projetos";

      var modalInstance = $uibModal.open({
        animation: true,
        size: "sm",
        controllerAs: '$ctrl',
        controller: function (objProject, projects) {
          var $ctrl = this;
          $ctrl.objProject = objProject;
          $ctrl.projects = projects;
          
          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.confirm = function () {
            modalInstance.close($ctrl.objProject.project);
          }
          $ctrl.options = _buildStdOptions(null, null, $ctrl.confirm, $ctrl.cancel);
        },
        resolve: {
          objProject: function () {
            return {
              project: inProject
            };
          },
          projects: projectDataService.list()
        },
        template: _buildTemplate(title, null, content)
      });
      return modalInstance.result;
    }



    /**
     * Mostra mensagem de popup na tela
     *
     * @param {string} text texto a ser exibido.
     */
    function showMessage(title, html) {
      var modalInstance = $uibModal.open({
        animation: true,
        controller: function () {
          var $ctrl = this;
          $ctrl.ok = function () {
            modalInstance.close();
          }
          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.options = _buildOkOptions(null, $ctrl.ok);
        },
        controllerAs: '$ctrl',
        template: _buildTemplate(title, null, html)
      });
      modalInstance.result.then(function () {}, function () {});
    }

    /**
     * Mostra mensagem de popup na tela
     *
     * @param {string} title título.
     * @param {string} html texto a ser exibido.
     * @param {string} confirmText texto a ser exibido no botão de confirmação da operação.
     * @param {string} cancelText texto a ser exibido no botão de cancelamento da operação.
     * @returns uma promessa sobre a confirmação (aceita se o usuário confirmar e rejeitada se desistir)
     */
    function confirmWarningMessage(title, content, confirmText, cancelText) {
      cancelText = cancelText || "Cancelar";
      confirmText = confirmText || "Confirmar";
      title = title || "Atenção";
      // title = '<span class="fa fa-warning"></span> - ' + title;
      var options = [
        { text: cancelText, class: "default", callback: function() { modalInstance.dismiss() } },
        { text: confirmText, class: "danger", callback: function() { modalInstance.close() } }
      ]
      var modalInstance = $uibModal.open({
        animation: true,
        controller: function () {
          var $ctrl = this;
          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.options = options;
        },
        controllerAs: '$ctrl',
        template: _buildTemplate(title, 'danger', content)
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
    function runFormOperation($rootScope, formName, data, title, html, confirmText, cancelText, size) {
      title = title || "";
      size = size || "lg";
      var modalInstance = $uibModal.open({
        size: size,
        animation: true,
        controller: function () {
          var $ctrl = this;
          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.confirm = function () {
            modalInstance.close();
          }
          $ctrl.options = _buildStdOptions(confirmText, cancelText, $ctrl.confirm, $ctrl.cancel);
        },
        controllerAs: '$ctrl',
        template: _buildTemplate(title, null, html)
      });
      var promisse = modalInstance.result;
      promisse.then(function () {
        var evName = mountFormOperationEventName(formName);
        $rootScope.$emit(evName, data);
      }, function () {
        var evName = mountFormOperationEventName(formName);
        $rootScope.$emit(evName, null);
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
      toastr.error(text + "", title);
      $log.log("ERROR: " + text);
    }

  }


})();
