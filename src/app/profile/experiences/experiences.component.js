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
  function controller($rootScope, $scope, $log, userDataService, skillDataService, ttGuiUtilService) {
    var $ctrl = this;

    $scope.getSkillBadgeClass = function(s) {
      return ttGuiUtilService.getBadgeClassForSkillLevel(s.getLevel());
    }

    $ctrl.mountGridData = function (experiences) {

      var skillsCellTemplate = '<span ng-repeat="s in grid.getCellValue(row, col).getSkills()" class="badge {{grid.appScope.getSkillBadgeClass(grid.getCellValue(row, col).getSkills()[$index])}}">' +
      '<span class=" fa fa-times" ng-click="grid.appScope.delSkill(grid.getCellValue(row, col), $index)"></span>' +
      '<span class=" fa fa-eye" ng-click="grid.appScope.showSkillDetails(grid.getCellValue(row, col).getSkills()[$index])"></span>' +
      '<span>{{grid.getCellValue(row, col).getSkills()[$index].getName()}}</span>' +
      '</span>' +
      '<span class="fa fa-plus-circle tt-fa-widget" ng-click="grid.appScope.addSkill(grid.getCellValue(row, col))"></span>';

      var projectCellTemplate = '<span ng-if="grid.getCellValue(row, col).getProject()">' +
      '<span class="badge tt-badge-primary">' +
      '<span class=" fa fa-times" ng-click="grid.appScope.delProject(grid.getCellValue(row, col))"></span>' +
      '<span class=" fa fa-eye" ng-click="grid.appScope.showProjectDetails(grid.getCellValue(row, col))"></span>' +
      '{{grid.getCellValue(row, col).getProject().getName()}}</span>' +
      '<span class="fa fa-pencil tt-fa-widget" ng-click="grid.appScope.editProject(grid.getCellValue(row, col))"></span>' +
      '</span>';

      var titleCellTemplate =
      '<span> {{grid.getCellValue(row, col).getTitle()}}</span>' +
      '<span class="fa fa-pencil tt-fa-widget" ng-click="grid.appScope.editTitle(grid.getCellValue(row, col))" title="Editar título"></span>';

      var startCellTemplate =
      '<span> {{grid.getCellValue(row, col).getStartDate()}}</span>' +
      '<span class="fa fa-pencil tt-fa-widget" ng-click="grid.appScope.editStartDate(grid.getCellValue(row, col))" title="Editar data"></span>' +
      '<span class="fa fa-times tt-fa-widget" ng-click="grid.appScope.delStartDate(grid.getCellValue(row, col))" title="Apagar data></span>';

      var endCellTemplate =
      '<span> {{grid.getCellValue(row, col).getEndDate()}}</span>' +
      '<span class="fa fa-pencil tt-fa-widget" ng-click="grid.appScope.editEndDate(grid.getCellValue(row, col))" title="Editar data"></span>' +
      '<span class="fa fa-times tt-fa-widget" ng-click="grid.appScope.delEndDate(grid.getCellValue(row, col))" title="Apagar data"></span>';


      var delCellTemplate = '<span class="fa fa-trash tt-fa-widget" ng-click="grid.appScope.delExperience(grid.getCellValue(row, col))" title="Apagar experiência"></span>';
      var detCellTemplate = '<span class="fa fa-eye tt-fa-widget" ng-click="grid.appScope.showExperienceDetails(grid.getCellValue(row, col))"title="Ver detalhes da experiência"></span>';
      var edDescCellTemplate = '<span class="fa fa-tag tt-fa-widget" ng-click="grid.appScope.editDescription(grid.getCellValue(row, col))" title="Editar descrição da experiência"></span>';
      var actionsCellTemplate = delCellTemplate + detCellTemplate + edDescCellTemplate;

      var gData = {
        enableColumnResizing: true,
        enableColumnMenus: false,
        columnDefs: [
          { name: 'Título', field: 'experience', enableColumnMenus: false, cellTemplate: titleCellTemplate, width: '20%' },
          { name: 'Início', field: 'experience', width: '9%', cellTemplate: startCellTemplate },
          { name: 'Término', field: 'experience', width: '9%', cellTemplate: endCellTemplate },
          { name: 'Competências', field: 'experience', cellTemplate: skillsCellTemplate, width: '40%' },
          { name: 'Projeto', field: 'experience', cellTemplate: projectCellTemplate, cellTooltip: 'Projeto', width: '15%' },
          { name: 'Ações', field: 'experience', cellTemplate: actionsCellTemplate, enableSorting: false, enableColumnResizing: false, width: '6%' }
        ],
        data: []
      };

      angular.forEach(experiences, function(v, i){
        gData.data[i] = { experience: v }
      });
      return gData;
    }

    $scope.delExperience = function (experience) {
      var title = experience.getTitle();
      var warnMsg = "Deseja realmente apagar a experiência '" + title + "'?";
      var promisse = ttGuiUtilService.confirmWarningMessage(null, warnMsg, "Apagar");
      promisse.then(function () {
        $ctrl.user.removeExperience(experience);
        userDataService.update($ctrl.user);
        var infoMsg = "Experiência '" + title + "'apagada com sucesso."
        ttGuiUtilService.showInfoMessage(null, infoMsg);
      }, function () {
        $log.log('operação cancelada');
      });
    }

    $scope.showSkillDetails = function (skill) {
      var desc = skill.getDescription() || "(sem texto disponível)";
      var html = '<h2>' + skill.getName() + '</h2>' +
        '<p>' + desc + '</p>';
      ttGuiUtilService.showMessage("Competência de " + $ctrl.user.getName(), html);
    }

    $scope.delSkill = function (experience, index) {
      var skills = experience.getSkills();
      var skill = skills[index];
      experience.removeSkill(skill);
      userDataService.update($ctrl.user);
      ttGuiUtilService.showInfoMessage(null, "Competência " + skill.getName() + " removida.");
    }


    $ctrl.addSkillCallback = function(data, skillUser) {
      var user = data.user;
      var experience = data.experience;
      experience.addSkill(skillUser);
      userDataService.update(user);
      ttGuiUtilService.showInfoMessage(null, "Competência " + skillUser.getName() + " inserida");
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
      ttGuiUtilService.runFormOperation($rootScope, formName, data, title, html, "Inserir", null, "md");
    }

    $scope.delProject = function (experience) {
      experience.setProject(null);
      userDataService.update($ctrl.user);
      ttGuiUtilService.showInfoMessage(null, "Projeto de removido");
    }

    $scope.editProject = function (experience) {
      var prm = ttGuiUtilService.chooseProject(experience.getProject());
      prm.then(function(prj) {
        $log.log("projeto selecionado: ", prj);
        experience.setProject(prj);
        userDataService.update($ctrl.user);
        ttGuiUtilService.showInfoMessage(null, "Projeto ajustado");
      },
      function() {
        $log.log("[DEBUG] ERRO: ");
      })
      .catch(function (exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      });
    }

    $scope.delStartDate = function (experience) {
      try{
      experience.setStartDate(null);
      userDataService.update($ctrl.user);
      ttGuiUtilService.showInfoMessage(null, "Data apagada");
      }
      catch(exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      }
    }

    $scope.delEndDate = function (experience) {
      try{
      experience.setEndDate(null);
      userDataService.update($ctrl.user);
      ttGuiUtilService.showInfoMessage(null, "Data apagada");
      }
      catch(exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      }
    }

    $scope.editStartDate = function (experience) {
      var prm = ttGuiUtilService.chooseDate(null, null, experience.getStartDate());
      prm.then(function(date) {
        experience.setStartDate(date);
        userDataService.update($ctrl.user);
        ttGuiUtilService.showInfoMessage(null, "Data ajustada");
      },
      function() {
      })
      .catch(function (exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      });
    }

    $scope.editEndDate = function (experience) {
      var prm = ttGuiUtilService.chooseDate(null, null, experience.getEndDate());
      prm.then(function(date) {
        experience.setEndDate(date);
        userDataService.update($ctrl.user);
        ttGuiUtilService.showInfoMessage(null, "Data ajustada");
      },
      function() {
      })
      .catch(function (exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      });
    }

    $scope.editDescription = function (experience) {
      var prm = ttGuiUtilService.chooseString("Descrição", "Entre com a nova descrição.", experience.getDescription(), true);
      prm.then(function(string) {
        experience.setDescription(string);
        userDataService.update($ctrl.user);
        ttGuiUtilService.showInfoMessage(null, "Descrição da experiência ajustada");
      },
      function() {
      })
      .catch(function (exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      });
    }

    $scope.editTitle = function (experience) {
      var prm = ttGuiUtilService.chooseString("Título", "Entre com o novo título.", experience.getTitle(), false);
      prm.then(function(string) {
        experience.setTitle(string);
        userDataService.update($ctrl.user);
        ttGuiUtilService.showInfoMessage(null, "Título da experiência ajustada.");
      },
      function() {
      })
      .catch(function (exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      });
    }

    $scope.showProjectDetails = function (experience) {
      var project = experience.getProject();
      if (!project) return;
      var desc = project.getDescription() || "(sem texto disponível)";
      var html = '<h2>' + project.getName() + '</h2>' +
        '<p>' + desc + '</p>';
      ttGuiUtilService.showMessage("Projeto de " + $ctrl.user.getName(), html);
    }

    $scope.showExperienceDetails = function (experience) {
      var desc = experience.getDescription() || "(sem texto de descrição disponível)";
      var prjName = experience.getProject() ? experience.getProject().getName() : "(sem projeto associado)";
      var html = '<h2>' + experience.getTitle() + '</h2>' +
        '<h3> Projeto: ' + prjName + '</h3>' +
        '<p>' + desc + '</p>';
      ttGuiUtilService.showMessage("Experiência de " + $ctrl.user.getName(), html);
    }


    $ctrl.addExperience = function () {
      var title = "Adição de Experiência";
      var html = '<tt-profile-new-experience></tt-profile-new-experience>';
      var formName = "newExperienceForm";
      var data = {
        user: $ctrl.user
      };
      ttGuiUtilService.runFormOperation($rootScope, formName, data, title, html, "Criar");
    }

    $ctrl.$onInit = function () {
      $ctrl.gridData = $ctrl.mountGridData($ctrl.user.getExperiences());
    }
  }


})();
