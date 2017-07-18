(function() {
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
  function controller($scope, $log, toastr, userDataService) {
    var $ctrl = this;

    $ctrl.mountGridData = function(experiences) {

      var skillsCellTemplate = '<span ng-repeat="s in grid.getCellValue(row, col)" class="badge" ng-click="grid.appScope.showSkillDetails(grid.getCellValue(row, col)[$index])">{{grid.getCellValue(row, col)[$index].getName()}}</span>'
      var projectCellTemplate = '<span class="badge" ng-click="grid.appScope.showProjectDetails(grid.getCellValue(row, col))">{{grid.getCellValue(row, col).getName()}}</span>';
      var delCellTemplate = '<span class="fa fa-trash" ng-click="grid.appScope.delExperience(grid.getCellValue(row, col))"></span>';
      var detCellTemplate = '<span class="fa fa-file-o" ng-click="grid.appScope.showExperienceDetails(grid.getCellValue(row, col))"></span>';
      var actionsCellTemplate = delCellTemplate + detCellTemplate;

      var gData = { 
        enableColumnResizing: true,
        enableGridMenu: false,
        enableHiding: false,
        columnDefs: [ 
          { name: 'Nome', field: 'name', cellTooltip: 'Nome', enableColumnMenus: false, width: '25%', enableHiding: false },
          { name: 'Data', field: 'date', width: '15%', enableHiding: false },
          { name: 'Competências', field: 'skills', cellTemplate: skillsCellTemplate, width: '40%', enableHiding: false },
          { name: 'Projeto', field: 'project', cellTemplate: projectCellTemplate, cellTooltip: 'Projeto', width: '15%', enableHiding: false },
          { name: 'Ações', field: 'actions', cellTemplate: actionsCellTemplate, enableSorting: false, enableColumnResizing: false, width: '5%', enableHiding: false }
        ],
        data: []
      };

      for (var i = 0; i < experiences.length; i++) {
         var exp = experiences[i];
         gData.data[i] = {
           name: exp.getTitle(),
           date: exp.getStartDate() + " - " + exp.getEndDate(),
           skills: exp.getSkills(),
           project: exp.getProject(),
           actions: exp
         };
      }
      return gData;
    }
    
    $scope.delExperience = function(experience) {
      $log.log(experience, $ctrl.user);
      $ctrl.user.removeExperience(experience);
      userDataService.update($ctrl.user);
      toastr.success("Experiência " + experience.getTitle() + " apagada com sucesso.");
    }

    $scope.showSkillDetails = function(skill) {
      $log.log(skill);
      toastr.info("Competência " + skill.getName());
    }

    $scope.showProjectDetails = function(project) {
      $log.log(project);
      toastr.info("Projeto: " + project.getName());
    }

    $scope.showExperienceDetails = function(experience) {
      $log.log(experience);
      toastr.info("Descrição: " + experience.getDescription(), experience.getTitle());
    }

    $ctrl.$onInit = function() {
      $ctrl.gridData = $ctrl.mountGridData($ctrl.user.getExperiences());
      // $log.log($ctrl.user.getExperiences());
    }
  }


})();
