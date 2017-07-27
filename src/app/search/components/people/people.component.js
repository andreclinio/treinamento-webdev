(function () {
  'use strict';

  angular
    .module('search')
    .component('ttSearchPeople', {
      templateUrl: 'app/search/components/people/people.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        skills: '<'
      }
    });

  /** @ngInject */
  function controller($rootScope, $scope, $log, $sce, userDataService, skillDataService, ttGuiUtilService) {
    var $ctrl = this;

    function buildTemplate(html) {
        return '<span ng-repeat="s in grid.getCellValue(row, col).getSearchSkills()">' + $sce.trustAsHtml(html) + '</span>';
    }

    $scope.getBadgeClassForSkillLevel= function(level) {
        return ttGuiUtilService.getBadgeClassForSkillLevel(level);
    }

    $ctrl.mountGridData = function (users) {
      var experiencesCellTemplate = buildTemplate('{{s.getName()}} <span class="badge">{{s.getExperienceCount()}}</span>&nbsp;&nbsp;');
      var projectsCellTemplate =  buildTemplate('{{s.getName()}} <span class="badge">{{s.getProjectCount()}}</span>&nbsp;&nbsp;');
      var levelCellTemplate =  buildTemplate('<span class="badge {{grid.appScope.getBadgeClassForSkillLevel(s.getLevel())}}"> {{s.getName()}}</span>');
      var nameCellTemplate = '<span> {{grid.getCellValue(row, col).getName()}}</span>';

      var gridOptions = {
        enableColumnResizing: true,
        enableColumnMenus: false,
        columnDefs: [{
            name: 'Nome',
            field: 'user',
            enableColumnMenus: false,
            cellTemplate: nameCellTemplate,
            width: '25%'
          },
          {
            name: 'Experiências',
            field: 'user',
            cellTemplate: experiencesCellTemplate,
            width: '25%'
          },
          {
            name: 'Projetos',
            field: 'user',
            cellTemplate: projectsCellTemplate,
            width: '25%'
          },
          {
            name: 'Nível',
            field: 'user',
            cellTemplate: levelCellTemplate,
            width: '25%'
          }
        ],
        data: []
      };

      angular.forEach(users, function (v) {
        gridOptions.data.push({
          user: v
        });
      });
      return gridOptions;
    }

    $ctrl.update = function () {
      $log.log("update");
      var names = [];
      angular.forEach($ctrl.skills, function (sk) {
        names.push(sk.getName());
      });

      var prm = skillDataService.users(names);
      $log.log("n:", names);
      $log.log("s:", $ctrl.skills);
      prm.then(function (users) {
        $log.log("u:", users);
        $ctrl.gridData = $ctrl.mountGridData(users);
        angular.element("#people-grid").load();
      }, function (obj) {
        $ctrl.gridData = $ctrl.mountGridData([]);
        ttGuiUtilService.showErrorMessage(null, "Falha na busca de pessoas: " + obj);
      }).catch(function (ex) {
        $ctrl.gridData = $ctrl.mountGridData([]);
        ttGuiUtilService.showErrorMessage(ex);
        $log.log("PILHA", ex.stack);
      })

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
