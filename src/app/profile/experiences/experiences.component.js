(function () {
  'use strict';

  angular
    .module('core')
    .component('ttProfileExperiences', {
      templateUrl: 'app/profile/experiences/experiences.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        user: '<'
      }
    });

  /** @ngInject */
  function controller($rootScope, $scope, $log, userDataService, ttUtilService) {
    var $ctrl = this;

    $ctrl.mountGridData = function (experiences) {

      var skillsCellTemplate = '<span ng-repeat="s in grid.getCellValue(row, col)" class="badge" ng-click="grid.appScope.showSkillDetails(grid.getCellValue(row, col)[$index])">{{grid.getCellValue(row, col)[$index].getName()}}</span>'
      var projectCellTemplate = '<span class="badge" ng-click="grid.appScope.showProjectDetails(grid.getCellValue(row, col))">{{grid.getCellValue(row, col).getName()}}</span>';
      var delCellTemplate = '<span class="fa fa-trash" ng-click="grid.appScope.delExperience(grid.getCellValue(row, col))"></span>';
      var detCellTemplate = '<span class="fa fa-eye" ng-click="grid.appScope.showExperienceDetails(grid.getCellValue(row, col))"></span>';
      var actionsCellTemplate = delCellTemplate + detCellTemplate;

      var gData = {
        enableColumnResizing: true,
        enableColumnMenus: false,
        columnDefs: [{
            name: 'Título',
            field: 'title',
            cellTooltip: 'Título',
            enableColumnMenus: false,
            width: '25%'
          },
          {
            name: 'Data',
            field: 'date',
            width: '15%'
          },
          {
            name: 'Competências',
            field: 'skills',
            cellTemplate: skillsCellTemplate,
            width: '40%'
          },
          {
            name: 'Projeto',
            field: 'project',
            cellTemplate: projectCellTemplate,
            cellTooltip: 'Projeto',
            width: '15%'
          },
          {
            name: 'Ações',
            field: 'actions',
            cellTemplate: actionsCellTemplate,
            enableSorting: false,
            enableColumnResizing: false,
            width: '5%'
          }
        ],
        data: []
      };

      for (var i = 0; i < experiences.length; i++) {
        var exp = experiences[i];
        gData.data[i] = {
          title: exp.getTitle(),
          date: exp.getStartDate() + " - " + exp.getEndDate(),
          skills: exp.getSkills(),
          project: exp.getProject(),
          actions: exp
        };
      }
      return gData;
    }

    $scope.delExperience = function (experience) {
      var title = experience.getTitle();
      var warnMsg = "Deseja realmente apagar a experiência '" + title + "'?";
      var promisse = ttUtilService.confirmWarningMessage(null, warnMsg, "Apagar");
      promisse.then(function () {
        // $ctrl.user.removeExperience(experience);
        // userDataService.update($ctrl.user);
        var infoMsg = "Experiência '" + title + "'apagada com sucesso."
        ttUtilService.showInfoMessage(null, infoMsg);
      }, function () {
        $log.log('operação cancelada');
      });
    }

    $scope.showSkillDetails = function (skill) {
      var desc = skill.getDescription() || "(sem texto disponível)";
      var html = '<h2>' + skill.getName() + '</h2>' +
        '<p>' + desc + '</p>';
      ttUtilService.showMessage("Competência de " + $ctrl.user.getName(), html);
    }

    $scope.showProjectDetails = function (project) {
      var desc = project.getDescription() || "(sem texto disponível)";
      var html = '<h2>' + project.getName() + '</h2>' +
        '<p>' + desc + '</p>';
      ttUtilService.showMessage("Projeto de " + $ctrl.user.getName(), html);
    }

    $scope.showExperienceDetails = function (experience) {
      var desc = experience.getDescription() || "(sem texto disponível)";
      var prjName = experience.getProject() ? experience.getProject().getName() : "(sem projeto associado)";
      var html = '<h2>' + experience.getTitle() + '</h2>' +
        '<h3> Projeto: ' + prjName + '</h3>' +
        '<p>' + desc + '</p>';
      ttUtilService.showMessage("Experiência de " + $ctrl.user.getName(), html);
    }


    $ctrl.addExperience = function () {
      var title = "Adição de Experiência";
      var html = '<tt-profile-new-experience></tt-profile-new-experience>';
      var formName = "newExperienceForm";
      var data = {
        user: $ctrl.user
      };
      ttUtilService.runFormOperation($rootScope, formName, data, title, html, "Criar");
    }

    $ctrl.$onInit = function () {
      $ctrl.gridData = $ctrl.mountGridData($ctrl.user.getExperiences());
    }
  }


})();
