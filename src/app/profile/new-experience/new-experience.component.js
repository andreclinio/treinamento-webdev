(function () {
  'use strict';

  angular
    .module('profile')
    .component('ttProfileNewExperience', {
      templateUrl: 'app/profile/new-experience/new-experience.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        user: '<'
      }
    });

  /** @ngInject */
  function controller($rootScope, $log, $state, $scope, Experience, SkillUser, ttGuiUtilService, ttModelUtilService, userDataService, projectDataService, skillDataService) {
    var $ctrl = this;

    /**
     * Inicializador do componente
     */
    $ctrl.$onInit = function () {
      var eventName = ttGuiUtilService.mountFormOperationEventName("newExperienceForm");
      $ctrl.listener = $rootScope.$on(eventName, function (event, data) {
        if (!data) return;
        $ctrl.addExperience(data.user);
      });

      $ctrl.projects = [];
      var prm = projectDataService.list();
      prm.then(function (projs) {
        angular.forEach(projs, function (p) {
          $ctrl.projects.push(p);
        });
      }, function () {});

      $ctrl.skills = [];
      $ctrl.startDate = new Date();
      $ctrl.endDate = new Date();
      $ctrl.updateSkillsGrid();
    }

    /**
     * Destroy
     */
    $ctrl.$onDestroy = function () {
      $ctrl.listener();
    }

    $ctrl.addSkillCallback = function (data, skillUser) {
      $ctrl.skills.push(skillUser);
      $ctrl.updateSkillsGrid();
    }

    $ctrl.addNewSkill = function () {
      var title = "Adição de Competência";
      var html = '<tt-profile-new-skill-user></tt-profile-new-skill-user>';
      var formName = "newSkillUserForm";
      var data = {
        callback: $ctrl.addSkillCallback
      };
      ttGuiUtilService.runFormOperation($rootScope, formName, data, title, html, "Inserir", null, "md");
    }

    $ctrl.updateSkillsGrid = function () {
      $ctrl.gridData = $ctrl.mountGridData($ctrl.skills);
    }

    $ctrl.loadSkills = function (query) {
      return skillDataService.search(query);
    }

    $scope.getLevelText = function(level) {
      return ttModelUtilService.getSkillLevelName(level);
    }

    $scope.getLevelClass = function(level) {
      return ttGuiUtilService.getBadgeClassForSkillLevel(level);
    }

    $scope.delSkill = function(index) {
      $ctrl.skills.splice(index, 1);
      $ctrl.updateSkillsGrid();
    }

    $ctrl.mountGridData = function (skills) {
      var titleCellTemplate = '<span>{{grid.getCellValue(row, col).getName()}}</spanh1>';
      var levelCellTemplate = '<span class="{{grid.appScope.getLevelClass(grid.getCellValue(row, col).getLevel())}}">{{grid.appScope.getLevelText(grid.getCellValue(row, col).getLevel())}}</span>';
      var delCellTemplate = '<span class="fa fa-trash tt-fa-widget" ng-click="grid.appScope.delSkill(row)" title="Apagar"></span>';
      var actionsCellTemplate = delCellTemplate;

      var gData = {
        enableColumnResizing: true,
        enableColumnMenus: false,
        enableSorting: false,
        columnDefs: [{
            name: 'Título',
            field: 'skill',
            cellTemplate: titleCellTemplate,
            enableSorting: false,
            width: '50%'
          },
          {
            name: 'Nível',
            field: 'skill',
            cellTemplate: levelCellTemplate,
            cellTooltip: 'Nível',
            width: '30%'
          },
          {
            name: 'Ações',
            field: 'skill',
            cellTemplate: actionsCellTemplate,
            width: '20%'
          }
        ],
        data: []
      };

      angular.forEach(skills, function (v, i) {
        gData.data[i] = {
          skill: v
        }
      });
      return gData;
    }


    $ctrl.addExperience = function () {
      var user = $ctrl.user;
      var title = $ctrl.title;
      var project = $ctrl.project;
      var startDate = $ctrl.startDate;
      var endDate = $ctrl.endDate;
      var description = $ctrl.description;

      try {
        var experience = new Experience(title);
        // TODO: Tirar o if
        if (project) {
          experience.setProject(project);
        }
        experience.setStartDate(ttModelUtilService.dateToString(startDate));
        experience.setEndDate(ttModelUtilService.dateToString(endDate));
        experience.setDescription(description);
        user.addExperience(experience);
        angular.forEach($ctrl.skills, function (sk) {
          experience.addSkill(sk);
        });

        userDataService.update(user);
        var infoMsg = "Experiência '" + title + "'inserida com sucesso."
        ttGuiUtilService.showInfoMessage(null, infoMsg);
        $state.go("private.profile.view");
      } catch (exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      }
    }
  }

})();
