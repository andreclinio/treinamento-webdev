(function () {
    'use strict';
  
    angular
      .module('search')
      .component('ttSearchProject', {
        templateUrl: 'app/search/components/project/project.component.html',
        controller: controller,
        controllerAs: '$ctrl',
        bindings: {
          skills: '<'
        }
      });
  
    /** @ngInject */
    function controller($rootScope, $scope, $log, userDataService, skillDataService, ttGuiUtilService) {
      var $ctrl = this;
  
      $ctrl.mountGridData = function (projects) {
  
        var experiencesCellTemplate =         '<span> {{grid.getCellValue(row, col).getName()}}</span>';
        var usersCellTemplate =         '<span> {{grid.getCellValue(row, col).getName()}}</span>';

        var nameCellTemplate = 
        '<span> {{grid.getCellValue(row, col).getName()}}</span>';
  
        var gridData = {
          enableColumnResizing: true,
          enableColumnMenus: false,
          columnDefs: [
            { name: 'Nome', field: 'user', enableColumnMenus: false, cellTemplate: nameCellTemplate, width: '33%' },
            { name: 'Pessoas', field: 'user', cellTemplate: usersCellTemplate, width: '33%' },
            { name: 'Experiências', field: 'user', cellTemplate: experiencesCellTemplate, width: '33%' }
          ],
          data: []
        };
  
        angular.forEach(projects, function(v, i){
          gridData.data[i] = { project: v }
        });
        return gridData;
      }
  
      $ctrl.update = function() {
        var projects = [];
        $ctrl.gridData = $ctrl.mountGridData(projects);
      }

      $ctrl.$onInit = function () {
        $ctrl.gridData = { data:[] };
        $ctrl.update();
        $ctrl.listener = $rootScope.$on("search.updated", function() {
            $ctrl.update();
        });
      }
  
      $ctrl.$onDestroy = function () {
          $ctrl.listener();
      }
    
    }
  
  
  })();
  