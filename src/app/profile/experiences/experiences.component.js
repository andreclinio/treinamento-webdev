(function () {
  'use strict';

  angular
    .module('profile')
    .component('ttProfileExperiences', {
      templateUrl: 'app/profile/experiences/experiences.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        user: '<'
      }
    });

  /** @ngInject */
  function controller($rootScope, $scope, $log, userDataService, skillDataService, ttUtilService, SkillUser) {
    var $ctrl = this;

    $ctrl.mountGridData = function (experiences) {

      var skillsCellTemplate = '<span ng-repeat="s in grid.getCellValue(row, col).getSkills()" class="badge badge-primary">' +
      '<span class=" fa fa-times" ng-click="grid.appScope.delSkill(grid.getCellValue(row, col), $index)"></span>' +
      '<span class=" fa fa-eye" ng-click="grid.appScope.showSkillDetails(grid.getCellValue(row, col).getSkills()[$index])"></span>' +
      '<span>{{grid.getCellValue(row, col).getSkills()[$index].getName()}}</span>' +
      '</span><span>&nbsp;</span>' +
      '<span class="fa fa-plus-circle" ng-click="grid.appScope.addSkill(grid.getCellValue(row, col))"></span>';

      var projectCellTemplate = '<span ng-if="grid.getCellValue(row, col).getProject()">' +
      '<span class="badge badge-primary">' +
      '<span class=" fa fa-times" ng-click="grid.appScope.delProject(grid.getCellValue(row, col))"></span>' +
      '<span class=" fa fa-eye" ng-click="grid.appScope.showProjectDetails(grid.getCellValue(row, col))"></span>' +
      '{{grid.getCellValue(row, col).getProject().getName()}}</span>' +
      '</span><span>&nbsp;</span>' +
      '<span class="fa fa-pencil" ng-click="grid.appScope.editProject(grid.getCellValue(row, col))"></span>' +
      '</span>';

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
            field: 'experience',
            cellTemplate: skillsCellTemplate,
            width: '40%'
          },
          {
            name: 'Projeto',
            field: 'experience',
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
          experience: exp,
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
        $ctrl.user.removeExperience(experience);
        userDataService.update($ctrl.user);
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

    $scope.delSkill = function (experience, index) {
      var skills = experience.getSkills();
      var skill = skills[index];
      experience.removeSkill(skill);
      userDataService.update($ctrl.user);
      ttUtilService.showInfoMessage(null, "Competência " + skill.getName() + " removida.");
    }


    $ctrl.addSkillCallback = function(data, skillUser) {
      var user = data.user;
      var experience = data.experience;
      experience.addSkill(skillUser);
      userDataService.update(user);
      ttUtilService.showInfoMessage(null, "Competência " + skillUser.getName() + " inserida");
    }

    $scope.addSkill = function (experience) {
      var title = "Adição de Competência";
      var html = '<tt-profile-new-skill-user></tt-profile-new-skill-user>';
      var formName = "newSkillUserForm";
      var data = {
        user: $ctrl.user,
        callback: $ctrl.addSkillCallback,
        experience: experience
      };
      ttUtilService.runFormOperation($rootScope, formName, data, title, html, "Inserir", null, "md");
    }

    $scope.delProject = function (experience) {
      experience.setProject(null);
      userDataService.update($ctrl.user);
      ttUtilService.showInfoMessage(null, "Projeto de removido");
    }

    $scope.editProject = function (experience) {
      var prm = ttUtilService.chooseProject(experience.getProject());
      prm.then(function(prj) {
        $log.log("projeto selecionado: ", prj);
        experience.setProject(prj);
        userDataService.update($ctrl.user);
        ttUtilService.showInfoMessage(null, "Projeto ajustado");
      },
      function() {
      })
      .catch(function (exception) {
        ttUtilService.showErrorMessage(null, exception);
      });
    }


    $scope.showProjectDetails = function (experience) {
      var project = experience.getProject();
      if (!project) return;
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
