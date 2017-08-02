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
      openForm: openForm,
      isFormOperationEventName: isFormOperationEventName,
      mountFormOperationEventName: mountFormOperationEventName,
      chooseProject: chooseProject,
      chooseDate: chooseDate,
      chooseString: chooseString,
      getTextClassForSkillLevel: getTextClassForSkillLevel,
      getBadgeClassForSkillLevel: getBadgeClassForSkillLevel,
      getHtmlForSkillLevel: getHtmlForSkillLevel
    }

    function _buildTemplate(header, body, footer) {
      return header + body + footer;
    }

    function _buildBody(html) {
      return '<div class="panel-body">' + $sce.trustAsHtml(html) + '</div>';
    }

    function _buildHeader(titleText, titleClass) {
      titleClass = titleClass || "primary";
      titleText = titleText || "";
      return '<div class="panel-' + titleClass + '"><div class="panel-heading"><div class="panel-title"><h1>' + $sce.trustAsHtml(titleText) + '</h1></div></div></div>';
    }

    function _buildFooter(confirmText, cancelText, confirmClass, cancelClass) {
      confirmText = confirmText || "Confirmar";
      cancelText = cancelText || "Cancelar";
      confirmClass = confirmClass || "primary";
      cancelClass = cancelClass || "default";
      return '<div class="panel-footer text-right">' +
        '<button class="btn btn-' + cancelClass + '" type="button" ng-click="$ctrl.cancel()">' + cancelText + '</button>&nbsp;' +
        '<button class="btn btn-' + confirmClass + '" type="button" ng-click="$ctrl.confirm()">' + confirmText + '</button>' +
        '</div>';
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
      var htmlDate = '<div uib-datepicker ng-model="$ctrl.date" class="" formats="[MM/yyyy]" datepicker-options="{minMode: \'month\'}" datepicker-mode="\'month\'" id="date"></div>'

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
        },
        template: _buildTemplate(_buildHeader(title), _buildBody('<p>' + text + '</p>' + htmlDate), _buildFooter())
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
        },
        template: _buildTemplate(_buildHeader(title), _buildBody('<p>' + text + '</p>' + widget), _buildFooter())
      });
      return modalInstance.result;
    }

    function chooseProject(inProject) {
      var title = "Projetos";
      $log.log("Entrada: ", inProject);
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
        },
        resolve: {
          objProject: function () {
            return {
              project: inProject
            };
          },
          projects: projectDataService.list()
        },
        template: _buildTemplate(_buildHeader(title),
          _buildBody('<tt-project-chooser projects="$ctrl.projects" obj-project="$ctrl.objProject"></tt-project-chooser>'),
          _buildFooter())
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
        },
        controllerAs: '$ctrl',
        template: _buildHeader(title) +
          _buildBody(html) +
          '<div class="panel-footer text-right">' +
          '<button class="btn btn-primary" type="button" ng-click="$ctrl.ok()">Fechar</button>' +
          '</div>'
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
    function confirmWarningMessage(title, html, confirmText, cancelText) {
      cancelText = cancelText || "Cancelar";
      confirmText = confirmText || "Confirmar";
      title = title || "Atenção";
      title = '<span class="fa fa-warning"></span> - ' + title;
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
        template: _buildTemplate(_buildHeader(title, "danger"), _buildBody(html), _buildFooter(null, null, "danger"))
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
      confirmText = confirmText || "Confirmar";
      cancelText = cancelText || "Cancelar";
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
        },
        controllerAs: '$ctrl',
        template: _buildTemplate(_buildHeader(title), _buildBody(html), _buildFooter(confirmText, cancelText))
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
     * Mostra componente de operações com popup na tela, enviando evento quando a operação é concluída.
     * @param {object} $rootScope.
     * @param {string} formName, nome do formulário.
     * @param {string} title título.
     * @param {string} html texto html do componente a ser exibido.
     * @param {string} confirmText texto a ser exibido no botão de confirmação da operação.
     * @param {string} cancelText texto a ser exibido no botão de cancelamento da operação.
     */
    function openForm($rootScope, formName, title, html, descriptor, confirmText, cancelText, size) {
      cancelText = cancelText || "Cancelar";
      confirmText = confirmText || "Confirmar";
      title = title || "";
      size = size || "lg";
      var data = {};
      var errors = descriptor.errors || [];
      var inputs = descriptor.inputs || [];

      var errorHtml = '<div ng-if="' + formName + '.$invalid" class="panel-footer">';
      angular.forEach(errors, function (err) {
        var fld = err.field;
        var alr = err.alert || "info";
        var dir = err.directive;
        var msg = err.message;
        if (fld && dir && msg) {
          var formField = formName + '.' + fld;
          errorHtml += '<div ng-if="' + formField + '.$error.' + dir + ' && ' + formField + '.$touched"' + ' class="alert alert-' + alr + '">' + msg + '</div>';
          //  errorHtml += '<div ng-if="'+ formField + '.$error.'+ dir + '" class="alert alert-' + alr + '">' + msg + '</div>';
        }
      });
      errorHtml += '</div>';

      var modalInstance = $uibModal.open({
        size: size,
        animation: true,
        controller: function (inputs) {
          var $ctrl = this;

          $ctrl.inputs = inputs;

          $ctrl.cancel = function () {
            modalInstance.dismiss();
          }
          $ctrl.confirm = function () {
            var form = angular.element("#" + formName)[0];
            $log.log("ctrlform", form);
            for (var i = 0; i < form.length; i++) {
              var widget = form[i];
              var name = widget.name;
              var value = widget.value;
              if (name !== "") data[name] = value;
            }
            modalInstance.close();
          }
        },
        controllerAs: '$ctrl',
        resolve: {
          inputs: function () {
            return inputs;
          }
        },
        template: '<form class="form-horizontal" id="' + formName + '" name="' + formName + '" novalidate">' +
          _buildHeader(title) +
          '<div class="panel-body">' +
          '<div class="container-fluid">' +
          $sce.trustAsHtml(html) +
          '</div>' +
          '</div>' +
          '<div class="panel-footer">' +
          '<button type="button" class="btn btn-default" ng-click="$ctrl.cancel()">' + cancelText + '</button>&nbsp;' +
          '<button ng-disabled="' + formName + '.$invalid" type="button" class="btn btn-primary" ng-click="$ctrl.confirm()">' + confirmText + '</button>' +
          '</div>' +
          '</div>' +
          $sce.trustAsHtml(errorHtml) +
          '</form>'
      });

      modalInstance.rendered.then(function () {
        var form = angular.element("#" + formName)[0];
        var inps = inputs;
        for (var i = 0; i < inps.length; i++) {
          var inp = inps[i];
          var field = inp.field;
          var value = inp.value;
          var elem1 = form.querySelectorAll("[name='" + field + "']")[0];
          var elem = angular.element("#" + field);
          if (field && value && field !== "") {
            // elem['ng-change'] = '$ctrl.xupdate()';
            elem1.value = value;
            elem.triggerHandler("change");
            elem.triggerHandler("input");
            elem.trigger('change');
            elem.trigger('input');

          }
        }
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
