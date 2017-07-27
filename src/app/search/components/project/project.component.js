(function () {
    'use strict';
  
    angular
      .module('search')
      .component('ttSearchProject', {
        templateUrl: 'app/search/components/project/project.component.html',
        controller: controller,
        controllerAs: '$ctrl',
        bindings: {
          skillsList: '<'
        }
      });
  
    /** @ngInject */
    function controller($rootScope, $scope, $log, userDataService, skillDataService, ttGuiUtilService) {
      var $ctrl = this;
  
      $ctrl.mountGridData = function (users) {
  
        var experiencesCellTemplate = '<span ng-repeat="s in grid.getCellValue(row, col).getSkills()" class="badge {{grid.appScope.getSkillBadgeClass(grid.getCellValue(row, col).getSkills()[$index])}}">' +
        '<span class=" fa fa-times" ng-click="grid.appScope.delSkill(grid.getCellValue(row, col), $index)"></span>' +
        '<span class=" fa fa-eye" ng-click="grid.appScope.showSkillDetails(grid.getCellValue(row, col).getSkills()[$index])"></span>' +
        '<span>{{grid.getCellValue(row, col).getSkills()[$index].getName()}}</span>' +
        '</span>' +
        '<span class="fa fa-plus-circle tt-fa-widget" ng-click="grid.appScope.addSkill(grid.getCellValue(row, col))"></span>';

        var usersCellTemplate = '<span ng-repeat="s in grid.getCellValue(row, col).getSkills()" class="badge {{grid.appScope.getSkillBadgeClass(grid.getCellValue(row, col).getSkills()[$index])}}">' +
        '<span class=" fa fa-times" ng-click="grid.appScope.delSkill(grid.getCellValue(row, col), $index)"></span>' +
        '<span class=" fa fa-eye" ng-click="grid.appScope.showSkillDetails(grid.getCellValue(row, col).getSkills()[$index])"></span>' +
        '<span>{{grid.getCellValue(row, col).getSkills()[$index].getName()}}</span>' +
        '</span>' +
        '<span class="fa fa-plus-circle tt-fa-widget" ng-click="grid.appScope.addSkill(grid.getCellValue(row, col))"></span>';

        var nameCellTemplate = 
        '<span> {{grid.getCellValue(row, col).getName()}}</span>';
  
        var gData = {
          enableColumnResizing: true,
          enableColumnMenus: false,
          columnDefs: [
            { name: 'Nome', field: 'user', enableColumnMenus: false, cellTemplate: nameCellTemplate, width: '33%' },
            { name: 'Pessoas', field: 'user', cellTemplate: usersCellTemplate, width: '33%' },
            { name: 'Experiências', field: 'user', cellTemplate: experiencesCellTemplate, width: '33%' }
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
  