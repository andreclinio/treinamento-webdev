(function () {
    'use strict';
  
    angular
      .module('search')
      .component('ttSearchPeople', {
        templateUrl: 'app/search/components/people/people.component.html',
        controller: controller,
        controllerAs: '$ctrl',
        bindings: {
          skillsList: '<'
        }
      });
  
    /** @ngInject */
    function controller($rootScope, $scope, $log, userDataService, skillDataService, ttGuiUtilService) {
      var $ctrl = this;
  
      $scope.getSkillBadgeClass = function(s) {
        var level = s.getLevel();
        if (level == 1) {
          return "tt-badge-skill-basic";
        }
        else if (level == 2) {
          return "tt-badge-skill-medium";
        }
        else if (level == 3) {
          return "tt-badge-skill-advanced";
        }
        else {
          return "";
        }
      }
  
      $ctrl.mountGridData = function (users) {
  
        var experiencesCellTemplate = '<span ng-repeat="s in grid.getCellValue(row, col).getSkills()" class="badge {{grid.appScope.getSkillBadgeClass(grid.getCellValue(row, col).getSkills()[$index])}}">' +
        '<span class=" fa fa-times" ng-click="grid.appScope.delSkill(grid.getCellValue(row, col), $index)"></span>' +
        '<span class=" fa fa-eye" ng-click="grid.appScope.showSkillDetails(grid.getCellValue(row, col).getSkills()[$index])"></span>' +
        '<span>{{grid.getCellValue(row, col).getSkills()[$index].getName()}}</span>' +
        '</span>' +
        '<span class="fa fa-plus-circle tt-fa-widget" ng-click="grid.appScope.addSkill(grid.getCellValue(row, col))"></span>';

        var projectsCellTemplate = '<span ng-repeat="s in grid.getCellValue(row, col).getSkills()" class="badge {{grid.appScope.getSkillBadgeClass(grid.getCellValue(row, col).getSkills()[$index])}}">' +
        '<span class=" fa fa-times" ng-click="grid.appScope.delSkill(grid.getCellValue(row, col), $index)"></span>' +
        '<span class=" fa fa-eye" ng-click="grid.appScope.showSkillDetails(grid.getCellValue(row, col).getSkills()[$index])"></span>' +
        '<span>{{grid.getCellValue(row, col).getSkills()[$index].getName()}}</span>' +
        '</span>' +
        '<span class="fa fa-plus-circle tt-fa-widget" ng-click="grid.appScope.addSkill(grid.getCellValue(row, col))"></span>';

        var titleCellTemplate = 
        '<span> {{grid.getCellValue(row, col).getName()}}</span>';
  
        var levelCellTemplate = 
        '<span> {{grid.getCellValue(row, col).getName()}}</span>';
  
  
        var gData = {
          enableColumnResizing: true,
          enableColumnMenus: false,
          columnDefs: [
            { name: 'Nome', field: 'user', enableColumnMenus: false, cellTemplate: titleCellTemplate, width: '25%' },
            { name: 'Experiências', field: 'user', cellTemplate: experiencesCellTemplate, width: '25%' },
            { name: 'Projetos', field: 'user', cellTemplate: projectsCellTemplate, width: '25%' },
            { name: 'Nível', field: 'user', cellTemplate: levelCellTemplate, width: '25%' }
          ],
          data: []
        };
  
        angular.forEach(users, function(v, i){
          gData.data[i] = { user: v }
        });
        return gData;
      }
  
      $ctrl.$onInit = function () {
        $ctrl.gridData = $ctrl.mountGridData($ctrl.skillList);
      }
    }
  
  
  })();
  