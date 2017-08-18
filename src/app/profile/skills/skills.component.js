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
  function controller($rootScope, $scope, $log, toastr,
      userDataService, ttGuiUtilService, ttModelUtilService, ttDialogService) {

    var $ctrl = this;

    $scope.getSkillBadgeClass = function (level) {
      return ttGuiUtilService.getBadgeClassForSkillLevel(level);
    }

    $scope.getSkillLevelText = function (level) {
      return ttModelUtilService.getSkillLevelName(level);
    }

    $ctrl.$onInit = function () {
      $ctrl.gridData = $ctrl.mountGridData($ctrl.user.getSkills());
      // $log.log("[DEBUG] after call mountGridData");
      // $log.log($ctrl.user.getSkills());
    }

    $ctrl.mountGridData = function (skills) {
      var levelCellTemplate = '<span class="badge {{grid.appScope.getSkillBadgeClass(grid.getCellValue(row,col))}}">{{ grid.appScope.getSkillLevelText( grid.getCellValue(row,col) ) }}</span>';
      var expCellTemplate = '<span class="badge" ng-click="grid.appScope.showExperiencesDetails(grid.getCellValue(row, col).experiences)">{{grid.getCellValue(row, col).experiences.length}}</span><span>Experiências</span>'
      var projCellTemplate = '<span class="badge" ng-click="grid.appScope.showProjectsDetails(grid.getCellValue(row, col).projects)">{{grid.getCellValue(row, col).projects.length}}</span><span>Projetos</span>'
      var expProjectsCellTemplate = expCellTemplate + " " + projCellTemplate;

      var delCellTemplate = '<span class="fa fa-trash tt-fa-widget" ng-click="grid.appScope.delSkill(grid.getCellValue(row, col).skill)" title="Apagar Competência"></span>';
      var viewCellTemplate = '<span class="fa fa-eye tt-fa-widget" ng-click="grid.appScope.showSkillDetails(grid.getCellValue(row, col))" title="Ver detalhes da Competência"></span>';
      var actionsCellTemplate = delCellTemplate + viewCellTemplate;

      var expProjHeader = 'Experiências / Projetos';

      var gridData = {
        enableColumnsResizing: true,
        enableColumnMenus: false,
        columnDefs: [
          { name: 'Competência', field: 'skillName', width: '15%' },
          { name: 'Nível',       field: 'skillLevel', width: '10%', cellTemplate: levelCellTemplate, },
          { name: expProjHeader, field: 'skillLine', width: '65%', cellTemplate: expProjectsCellTemplate, enableSorting: false },
          { name: 'Ações',       field: 'skillLine', width: '10%', cellTemplate: actionsCellTemplate, enableSorting: false, enableColumnResizing: false, enableHiding: false }
        ],
        data: []
      };

      // fill data structure
      for (var i = 0; i < skills.length; i++) {
        var skill = skills[i];
        var userExperiences = getExperiencesBySkillId(skill.getId());
        var userExpProjects = getProjectsByExperiences(userExperiences);
        gridData.data[i] = {
          skillName: skill.getName(),
          skillLevel: skill.getLevel(),
          expCount: skill.getExperienceCount(),
          projCount: skill.getProjectCount(),
          projectSkills: "(" + skill.getExperienceCount() + ") Experiências " + " (" + skill.getProjectCount() + ") Projetos",
          skillLine: {
            skill: skill,
            experiences: userExperiences,
            projects: userExpProjects
          }
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
      ttDialogService.showExperiences($ctrl.user.getName(), experiences);
    }

    $scope.showProjectsDetails = function (projects) {
      ttDialogService.showProjects($ctrl.user.getName(), projects);
    }

    $scope.delSkill = function (skill) {
      var title = skill.getName();
      var warnMsg = "Deseja realmente apagar a competência '" + title + "'?";
      var promisse = ttGuiUtilService.confirmWarningMessage(null, warnMsg, "Apagar");
      promisse.then(function () {
        $ctrl.user.removeSkill(skill);
        userDataService.update($ctrl.user);
        var infoMsg = "Competência '" + title + "'apagada com sucesso."
        ttGuiUtilService.showInfoMessage(null, infoMsg);
      }, function () {
        $log.log('operação cancelada!');
      });
    }

    $scope.showSkillDetails = function (skillLine) {
      var skill = skillLine.skill;
      var desc = skill.getDescription() || "(sem texto disponível)";
      var html = '<h2>' + skill.getName()  + '</h2>' +
                 '<h3>' + $scope.getSkillLevelText(skill.getLevel()) + '</h3>' +
                 '<p>' + desc + '</p>';
      var htmlExps = getExperiencesHtml(skillLine.experiences);
      var htmlProjs = getProjectsHtml(skillLine.projects);
      html += '<h2>Experiências</h2>' + htmlExps;
      html += '</br>';
      html += '<h2>Projetos</h2>' + htmlProjs;
      ttGuiUtilService.showMessage("Competência de " + $ctrl.user.getName(), html);
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

    function getExperiencesHtml (experiences) {
      var html = '<div>';
      if (experiences.length == 0) {
        html += '<h3>Não existem experiências associadas</h3>';
      }
      else {
        experiences.forEach(function (e) {
          html += '<h3>Título: ' + e.getTitle() + '</h3>';
          html += '<h4>Início: ' + e.getStartDate() + '</h4>';
          html += '<h4>Término: ' + e.getEndDate() + '</h4>';
        }, this);
      }
      html += '</div>';

      return html;
    }

    function getProjectsHtml (projects) {
      var html = '<div>';
      if (projects.length == 0) {
        html += '<h3>Não existem projetos associados</h3>';
      }
      else {
        projects.forEach(function (p) {
          html += '<h3>Nome: ' + p.getName() + '</h3>';
          html += '<h4>Descrição: ' + (p.getDescription() != undefined ? p.getDescription() : "Não informada") + '</h4>';
        }, this);
      }
      html += '</div>';

      return html;
    }

  }
})();
