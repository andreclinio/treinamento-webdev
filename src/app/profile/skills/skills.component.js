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

    $ctrl.$onInit = function () {
      // $ctrl.skills = $ctrl.user.getSkills();

      $ctrl.skillsData = mountSkillsTableData();
      // $log.log("skillsData: ", $ctrl.skillsData);
    }

    // $ctrl.$onChanges = function(changeObj) {
    // }

    $ctrl.getSkillBadgeClass = function (level) {
      return ttGuiUtilService.getBadgeClassForSkillLevel(level);
    }

    $ctrl.getSkillLevelText = function (level) {
      return ttModelUtilService.getSkillLevelName(level);
    }

    $scope.getSkillBadgeClass = function (level) {
      return ttGuiUtilService.getBadgeClassForSkillLevel(level);
    }

    $scope.getSkillLevelText = function (level) {
      return ttModelUtilService.getSkillLevelName(level);
    }

    $ctrl.showExperiencesDetails = function (experiences) {
      ttDialogService.showExperiences($ctrl.user.getName(), experiences);
    }

    $ctrl.showProjectsDetails = function (projects) {
      ttDialogService.showProjects($ctrl.user.getName(), projects);
    }

    $ctrl.delSkill = function (skill) {
      var title = skill.getName();
      var warnMsg = "Deseja realmente apagar a competência '" + title + "'?";
      var promisse = ttGuiUtilService.confirmWarningMessage(null, warnMsg, "Apagar");
      promisse.then(function () {
        $ctrl.user.removeSkill(skill);
        userDataService.update($ctrl.user);
        var infoMsg = "Competência '" + title + "'apagada com sucesso."
        ttGuiUtilService.showInfoMessage(null, infoMsg);
        updateSkillsList();
      }, function () {
        $log.log('operação cancelada!');
      });
    }

    $ctrl.showSkillDetails = function (skillLine) {
      var skill = skillLine.skill;
      var desc = skill.getDescription() || "(sem texto disponível)";
      var html = '<h3 class="tt-subtitle-table-style">' + skill.getName()  + '</h4>' +
                 '<h4>' + $scope.getSkillLevelText(skill.getLevel()) + '</h3>' +
                 '<p>' + desc + '</p>';
      var htmlExps = getExperiencesHtml(skillLine.experiences);
      var htmlProjs = getProjectsHtml(skillLine.projects);
      html += '<h3 class="tt-subtitle-table-style">Experiências</h3>' + htmlExps;
      html += '</br>';
      html += '<h3 class="tt-subtitle-table-style">Projetos</h3>' + htmlProjs;
      ttGuiUtilService.showMessage("Competência de " + $ctrl.user.getName(), html);
    }

    $ctrl.addSkillUserCallback = function (data, skillUser) {
      var user = data.user;
      user.addSkill(skillUser);
      userDataService.update(user);
      ttGuiUtilService.showInfoMessage(null, "Competência " + skillUser.getName() + " inserida");
      updateSkillsList();
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

    function updateSkillsList() {
      $ctrl.skillsData = mountSkillsTableData();
    }

    function mountSkillsTableData() {
      var skillsData = [];
      // fill data structure
      var skills = $ctrl.user.getSkills();
      for (var i = 0; i < $ctrl.user.getSkills().length; i++) {
        var skill = skills[i];
        var userExperiences = getExperiencesBySkillId(skill.getId());
        var userExpProjects = getProjectsByExperiences(userExperiences);
        skillsData[i] = {
          skillName: skill.getName(),
          skillLevel: skill.getLevel(),
          expCount: skill.getExperienceCount(),
          projCount: skill.getProjectCount(),
          // projectSkills: "(" + skill.getExperienceCount() + ") Experiências " + " (" + skill.getProjectCount() + ") Projetos",
          skillLine: {
            skill: skill,
            experiences: userExperiences,
            projects: userExpProjects
          }
        };
      }
      return skillsData;
    }

    /**
     * Obtém as experiências do usuário com uma determinado skillId.
     */
    function getExperiencesBySkillId (skillId) {
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

    function getProjectsByExperiences (experiences) {
      var projects = [];
      for (var i = 0; i < experiences.length; i++) {
        var exp = experiences[i];
        var project = exp.getProject();
        projects.push(project);
      }
      return projects;
    }

    function getExperiencesHtml (experiences) {
      var html = '<div>';
      if (experiences.length == 0) {
        html += '<h3>Não existem experiências associadas</h3>';
      }
      else {
        experiences.forEach(function (e) {
          html += '<h4>Título: ' + e.getTitle() + '</h4>';
          html += '<h5>Início: ' + e.getStartDate() + '</h5>';
          html += '<h5>Término: ' + e.getEndDate() + '</h5>';
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
          html += '<h4>Nome: ' + p.getName() + '</h4>';
          html += '<h5>Descrição: ' + (p.getDescription() != undefined ? p.getDescription() : "Não informada") + '</h5>';
        }, this);
      }
      html += '</div>';

      return html;
    }

  }
})();
