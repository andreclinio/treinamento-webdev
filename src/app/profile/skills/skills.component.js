(function () {
  'use strict';

  angular
    .module('profile')
    .component('ttProfileSkills', {
      templateUrl: 'app/profile/skills/skills.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        user: '<'
      }
    });

  /** @ngInject */
  function controller($rootScope, $scope, $log, toastr, userDataService, ttGuiUtilService, ttModelUtilService) {
    var $ctrl = this;

    $scope.getSkillBadgeClass = function (level) {
      return ttGuiUtilService.getBadgeClassForSkillLevel(level);
    }

    $scope.getSkillLevelText = function (level) {
      return ttModelUtilService.getSkillLevelName(level);
    }

    $ctrl.$onInit = function () {
      $ctrl.gridData = $ctrl.mountGridData($ctrl.user.getSkills());
      $log.log("[DEBUG] after call mountGridData");
      $log.log($ctrl.user.getSkills());
    }

    $ctrl.mountGridData = function (skills) {
      var levelCellTemplate = '<span class="badge {{grid.appScope.getSkillBadgeClass(grid.getCellValue(row,col))}}">{{ grid.appScope.getSkillLevelText( grid.getCellValue(row,col) ) }}</span>';
      var expCellTemplate = '<span class="badge" ng-click="grid.appScope.showExperiencesDetails(grid.getCellValue(row, col).experiences)">{{grid.getCellValue(row, col).experiences.length}}</span><span>Experiências</span>'
      var projCellTemplate = '<span class="badge" ng-click="grid.appScope.showProjectsDetails(grid.getCellValue(row, col).projects)">{{grid.getCellValue(row, col).projects.length}}</span><span>Projetos</span>'
      var expProjectsCellTemplate = expCellTemplate + " " + projCellTemplate;

      var delCellTemplate = '<span class="fa fa-trash" ng-click="grid.appScope.delExperience(grid.getCellValue(row, col))"></span>';
      var viewCellTemplate = '<span class="fa fa-file-o" ng-click="grid.appScope.showExperienceDetails(grid.getCellValue(row, col))"></span>';
      var actionsCellTemplate = delCellTemplate + viewCellTemplate;

      var gridData = {
        enableColumnsResizing: true,
        enableColumnMenus: false,
        columnDefs: [
          { name: 'Competência', field: 'skillName', width: '15%' },
          { name: 'Nível', field: 'skillLevel', width: '10%', cellTemplate: levelCellTemplate, },
          { name: 'Experiências / Projetos', field: 'expProjects', width: '70%', cellTemplate: expProjectsCellTemplate, enableSorting: false },
          { name: 'Ações', field: 'actions', width: '5%', cellTemplate: actionsCellTemplate, enableSorting: false, enableColumnResizing: false, enableHiding: false }
        ],
        data: []
      };

      // fill data structure
      for (var i = 0; i < skills.length; i++) {
        var skill = skills[i];
        var userExperiences = getExperiencesBySkillId(skill.getId());
        var userExpProjects = getProjectsByExperiences(userExperiences);
        // $log.log("Skill["+i+"]: " + skill.getId());
        // $log.log(userExperiences);
        var objects = {
          experiences: userExperiences,
          projects: userExpProjects
        };
        gridData.data[i] = {
          skillName: skill.getName(),
          skillLevel: skill.getLevel(),
          expCount: skill.getExperienceCount(),
          projCount: skill.getProjectCount(),
          projectSkills: "(" + skill.getExperienceCount() + ") Experiências " + " (" + skill.getProjectCount() + ") Projetos",
          expProjects: objects
        };
      }
      return gridData;
    }

    /**
     * Obtém as experiências do usuário com uma determinado skillId.
     */
    var getExperiencesBySkillId = function (skillId) {
      var experiences = [];
      var userExperiences = $ctrl.user.getExperiences();
      for (var i = 0; i < userExperiences.length; i++) {
        var exp = userExperiences[i];
        var skills = exp.getSkills();
        for (var j = 0; j < skills.length; j++) {
          var skill = skills[j];
          if (skill.getId() == skillId) {
            experiences.push(exp);
            break;
          }
        }
      }
      return experiences;
    }

    var getProjectsByExperiences = function (experiences) {
      var projects = [];
      for (var i = 0; i < experiences.length; i++) {
        var exp = experiences[i];
        var project = exp.getProject();
        projects.push(project);
      }
      return projects;
    }

    $scope.showExperiencesDetails = function (experiences) {
      var html = '<div>';
      if (experiences.length == 0) {
        html += '<h2>Não existem experiências associadas</h2>';
      }
      else {
        experiences.forEach(function (e) {
          html += '<h2>Título: ' + e.getTitle() + '</h2>';
          html += '<h3>Início: ' + e.getStartDate() + '</h3>';
          html += '<h3>Término: ' + e.getEndDate() + '</h3>';
          html += '</br>'
        }, this);
      }
      html += '</div>';

      ttGuiUtilService.showMessage("Experiência de " + $ctrl.user.getName(), html);
    }

    $scope.showProjectsDetails = function (projects) {
      // $log.log("projects: ", projects);
      var html = '<div>';
      if (projects.length == 0) {
        html += '<h2>Não existem projetos associados</h2>';
      }
      else {
        projects.forEach(function (p) {
          html += '<h2>Nome: ' + p.getName() + '</h2>';
          html += '<h3>Descrição: ' + (p.getDescription() != undefined ? p.getDescription() : "Não informada") + '</h3>';
          html += '</br>'
        }, this);
      }
      html += '</div>';
      ttGuiUtilService.showMessage("Projeto de " + $ctrl.user.getName(), html);
    }

    $ctrl.addSkillUserCallback = function (data, skillUser) {
      var user = data.user;
      user.addSkill(skillUser);
      userDataService.update(user);
      ttGuiUtilService.showInfoMessage(null, "Competência " + skillUser.getName() + " inserida");
    }

    $ctrl.addSkillUser = function () {
      var title = "Adição de Competência";
      var html = '<tt-profile-new-skill-user></tt-profile-new-skill-user>';
      var formName = "newSkillUserForm";
      var data = {
        user: $ctrl.user,
        callback: $ctrl.addSkillUserCallback
      };
      ttGuiUtilService.runFormOperation($rootScope, formName, data, title, html, "Criar", null, "md");
    }

  }
})();
