(function() {
  'use strict';

  angular
    .module('core')
    .component('ttProfileSkills', {
      templateUrl: 'app/profile/skills/skills.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        user: '<'
      }
    });

  /** @ngInject */
  function controller($scope, $log, toastr, userDataService, ttUtilService) {
    var $ctrl = this;

    $ctrl.$onInit = function() {
      $ctrl.gridData = $ctrl.mountGridData($ctrl.user.getSkills());
      $log.log("[DEBUG] after call mountGridData");
      $log.log($ctrl.user.getSkills());
    }

    $ctrl.mountGridData = function(skills) {
      var expCellTemplate = '<span class="badge" ng-click="grid.appScope.showExperiencesDetails(grid.getCellValue(row, col).experiences)">{{grid.getCellValue(row, col).experiences.length}}</span><span>Experiências</span>'
      var projCellTemplate = '<span class="badge" ng-click="grid.appScope.showProjectsDetails(grid.getCellValue(row, col).projects)">{{grid.getCellValue(row, col).projects.length}}</span><span>Projetos</span>'
      var expProjectsCellTemplate = expCellTemplate + " " + projCellTemplate;

      var delCellTemplate = '<span class="fa fa-trash" ng-click="grid.appScope.delExperience(grid.getCellValue(row, col))"></span>';
      var viewCellTemplate = '<span class="fa fa-file-o" ng-click="grid.appScope.showExperienceDetails(grid.getCellValue(row, col))"></span>';
      var actionsCellTemplate = delCellTemplate + viewCellTemplate;

      var gridData = {
        // headerTemplate: 'app/profile/skills/header-template.html',
        enableColumnsResizing: true,
        enableColumnMenus: false,
        columnDefs: [
          {name: 'Competência', field: 'skillName', width: '15%'},
          {name: 'Nível', field: 'skillLevel', width: '10%'},
          {name: 'Experiências / Projetos', field: 'expProjects', cellTemplate: expProjectsCellTemplate, width: '70%', enableSorting: false},
          {name: 'Ações', field: 'actions', cellTemplate: actionsCellTemplate, enableSorting: false, enableColumnResizing: false, width: '5%', enableHiding: false }
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
          projectSkills: "("+skill.getExperienceCount()+") Experiências " + " ("+skill.getProjectCount()+") Projetos",
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
      // $log.log("User experiences__1:");$log.log(userExperiences);
      for (var i = 0; i < userExperiences.length; i++) {
        var exp = userExperiences[i];
        // $log.log("exp Title: " + exp.getTitle());
        var skills = exp.getSkills();
        for (var j = 0; j < skills.length; j++) {
          var skill = skills[j];
          if ( skill.getId() == skillId ) {
            experiences.push(exp);
            // $log.log("Encontrei a skill: " + skill.getId() + " -- Experience: " + exp.getTitle());
            break;
          }
        }
        // $log.log("Vou procurar na próxima experiência pela skill: " + skill.getId());
      }
      return experiences;
    }

    var getProjectsByExperiences = function (experiences) {
      var projects = [];
      for (var i = 0; i < experiences.length; i++)   {
        var exp = experiences[i];
        var project = exp.getProject();
        projects.push(project);
      }
      return projects;
    }

    $scope.showExperiencesDetails = function(experiences) {
      var desc = experience.getDescription() || "(sem texto disponível)";
      var prj = experience.getProject() || "(sem projeto associado)";
      var html = '<h2>' + experience.getTitle() + '</h2>' +
                 '<h3> Projeto: ' + prj.getName() + '</h3>' +
                 '<p>' + desc + '</p>';
      ttUtilService.showMessage("Experiência de " + $ctrl.user.getName(), html);
    }

     $scope.showProjectsDetails = function(projects) {
      // $log.log(projects);
      var html = '<span>Antes</span>' +
                '<div ng-repeat=\"p in projects\">' +
                    '<h2>Nome: {{p.getName()}}</h2>' +
                    '<p>Desc: {{p.getDescription()}}</p>' +
                 '</div>'
      ttUtilService.showMessage("Projeto de " + $ctrl.user.getName(), html);
    }
  }
})();
