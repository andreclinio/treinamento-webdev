(function () {
    'use strict';

    angular
      .module('skill')
      .component('ttSkillTable', {
        templateUrl: 'app/skill/components/table/table.component.html',
        controller: controller,
        controllerAs: '$ctrl'
      });

    /** @ngInject */
    function controller($rootScope, $scope, $log, $state, skillDataService, ttGuiUtilService, ttModelUtilService) {
      var $ctrl = this;

      /**
       * Inicializador
       */
      $ctrl.$onInit = function () {
        $ctrl.skills = [];
        $ctrl.gridData = {
          data: []
        };
        $ctrl.update();
        $ctrl.listener = $rootScope.$on("search.updated", function (event, skills) {
          $ctrl.update(skills);
        });
      }

      /**
       * Destrutor
       */
      $ctrl.$onDestroy = function () {
        $ctrl.listener();
      }

      /**
       * Abretura de form para novo skill.
       */
      $ctrl.openNewSkill = function () {
        $state.go("private.skill.new-skill");
      }

      /**
       * Atualização da tabela.
       */
      $ctrl.update = function (skills) {
        skills = skills || [];
        $ctrl.gridData = $ctrl.mountGridData(skills);
        $ctrl.skills = skills;
      }

      $ctrl.getSelectionCount= function() {
        var sel = _getSelection();
        return sel.length;
      }

      $ctrl.mergeSelected = function() {
        var html = "<p> Competências combinadas:";
        html += _getSelectionText();
        // TODO
        ttGuiUtilService.showInfoMessage(null, html);
      }

      $ctrl.deleteSelected = function() {
        var html = "<p> Deseja realmente apagar as competências?";
        html += _getSelectionText();
        var promisse = ttGuiUtilService.confirmWarningMessage(null, html, "Apagar");
        promisse.then(function () {
          // TODO
          var infoMsg = "Competência(s) apagada(s) com sucesso."
          ttGuiUtilService.showInfoMessage(null, infoMsg);
        }, function () {
          $log.log('operação cancelada');
        });
      }

      function _getSelectionText() {
        var sel = _getSelection();
        var html = "<ul>";
        angular.forEach(sel, function (v) {
          html += "<li>" + v.getName();
        });
        html += "</ul>";
        return html;
      }

      function _getSelection() {
        var selection = [];
        angular.forEach($ctrl.skills, function (v) {
          if (v.selected) selection.push(v);
          });
        return selection;
      }

      $scope.getSkillBadgeClass = function(s) {
        return ttGuiUtilService.getBadgeClassForSkillValidity(s.getValidated());
      }

      $scope.getSkillValidityName = function(s) {
        return ttModelUtilService.getSkillValidityName(s.getValidated());
      }

      $scope.delSkill = function(skill) {
        var name = skill ? skill.getName() : "---";
        var warnMsg = "Deseja realmente apagar a competência '" + name + "'?";
        var promisse = ttGuiUtilService.confirmWarningMessage(null, warnMsg, "Apagar");
        promisse.then(function () {
          skillDataService.remove(skill);
          var infoMsg = "Competência '" + name + "'apagada com sucesso."
          ttGuiUtilService.showInfoMessage(null, infoMsg);
        }, function () {
        });
      }

      $scope.validateSkill = function(skill) {
        var name = skill ? skill.getName() : "---";
        skill.setValidated(true);
        skillDataService.update(skill);
        var infoMsg = "Competência '" + name + "'validada com sucesso."
        ttGuiUtilService.showInfoMessage(null, infoMsg);
      }

      $scope.editTitle = function (skill) {
        var prm = ttGuiUtilService.chooseString("Título", "Entre com o novo título.", skill.getName(), false, true);
        prm.then(function(string) {
          skill.setName(string);
          skillDataService.update(skill);
          ttGuiUtilService.showInfoMessage(null, "Título da competência ajustada.");
        },
        function() {
        })
        .catch(function (exception) {
          ttGuiUtilService.showErrorMessage(null, exception);
        });
      }

      $scope.showSkillDetails = function (skill) {
        var desc = skill.getDescription() || "(sem texto de descrição disponível)";
        var html = 
          '<h2>' + skill.getName() + '</h2>' +
          '<p>' + desc + '</p>';
        ttGuiUtilService.showMessage("Competência", html);
      }

      $scope.editDescription = function (skill) {
        var prm = ttGuiUtilService.chooseString("Descrição", "Entre com a nova descrição.", skill.getDescription(), true, false);
        prm.then(function(string) {
          skill.setDescription(string);
          skillDataService.update(skill);
          ttGuiUtilService.showInfoMessage(null, "Descrição da competência ajustada");
        },
        function() {
        })
        .catch(function (exception) {
          ttGuiUtilService.showErrorMessage(null, exception);
        });
      }
      /**
       * Montagem dos dados da tabela.
       */
      $ctrl.mountGridData = function (skills) {
        var nameCellTemplate = '<span> {{grid.getCellValue(row, col).getName()}}</span>' + 
        '<span class="fa fa-pencil tt-fa-widget" ng-click="grid.appScope.editTitle(grid.getCellValue(row, col))" title="Editar título"></span>';

        var statusCellTemplate = '<span class="tt-badge {{ grid.appScope.getSkillBadgeClass(grid.getCellValue(row, col)) }}"> {{ grid.appScope.getSkillValidityName(grid.getCellValue(row, col)) }}</span>';
        var usersCellTemplate = '<span> -- </span>';
        var experiencesCellTemplate = '<span> -- </span>';
        var projectsCellTemplate = '<span> -- </span>';

        var selCellTemplate = '<input type="checkbox" ng-model="grid.getCellValue(row, col).selected">';
        var delCellTemplate = '<span class="fa fa-trash tt-fa-widget" ng-click="grid.appScope.delSkill(grid.getCellValue(row, col))" title="Apagar competência"></span>';
        var valCellTemplate = '<span class="fa fa-check-circle tt-fa-widget" ng-click="grid.appScope.validateSkill(grid.getCellValue(row, col))"title="Validar competência"></span>';
        var edDescCellTemplate = '<span class="fa fa-tag tt-fa-widget" ng-click="grid.appScope.editDescription(grid.getCellValue(row, col))" title="Editar descrição da competência"></span>';
        var detCellTemplate = '<span class="fa fa-eye tt-fa-widget" ng-click="grid.appScope.showSkillDetails(grid.getCellValue(row, col))" title="Ver detalhes da competência"></span>';
        var actionsCellTemplate = delCellTemplate + valCellTemplate + edDescCellTemplate + detCellTemplate;

        var gridData = {
          enableColumnResizing: true,
          enableColumnMenus: false,
          columnDefs: [
            {
              name: '',
              field: 'skill',
              enableColumnMenus: false,
              cellTemplate: selCellTemplate,
              width: '5%'
            },
            {
              name: 'Nome',
              field: 'skill',
              enableColumnMenus: false,
              cellTemplate: nameCellTemplate,
              width: '15%'
            },
            {
              name: 'Status',
              field: 'skill',
              cellTemplate: statusCellTemplate,
              width: '10%'
            },
            {
              name: 'Pessoas',
              field: 'skill',
              cellTemplate: usersCellTemplate,
              width: '20%'
            },
            {
              name: 'Experiências',
              field: 'skill',
              cellTemplate: experiencesCellTemplate,
              width: '20%'
            },
            {
              name: 'Projetos',
              field: 'skill',
              cellTemplate: projectsCellTemplate,
              width: '20%'
            },
            {
              name: 'Ações',
              field: 'skill',
              cellTemplate: actionsCellTemplate,
              width: '15%'
            }
          ],
          data: []
        };
        angular.forEach(skills, function (v, i) {
          gridData.data[i] = {
            skill: v
          }
        });
        return gridData;
      }
    }


})();
