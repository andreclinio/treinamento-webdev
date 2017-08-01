(function () {
    'use strict';

    angular
      .module('skill')
      .component('ttSkillTable', {
        templateUrl: 'app/skill/components/table/table.component.html',
        controller: controller,
        controllerAs: '$ctrl',
        bindings: {
          skills: '<'
        }
      });

    /** @ngInject */
    function controller($rootScope, $log, ttGuiUtilService) {
      var $ctrl = this;

      /**
       * Inicializador
       */
      $ctrl.$onInit = function () {
        $ctrl.gridData = {
          data: []
        };
        $ctrl.update();
        $ctrl.listener = $rootScope.$on("search.updated", function () {
          $ctrl.update();
        });
      }

      /**
       * Destrutor
       */
      $ctrl.$onDestroy = function () {
        $ctrl.listener();
      }

      /**
       * Abretura de form para novo skill.
       */
      $ctrl.openNewSkill = function () {
        ttGuiUtilService.run
      }

      /**
       * Atualização da tabela.
       */
      $ctrl.update = function () {
        var skills = $ctrl.skills || [];
        $ctrl.gridData = $ctrl.mountGridData(skills);
      }

      /**
       * Montagem dos dados da tabela.
       */
      $ctrl.mountGridData = function (skills) {
        var nameCellTemplate = '<span> {{grid.getCellValue(row, col).getName()}}</span>';
        var statusCellTemplate = '<span> {{grid.getCellValue(row, col).getName()}}</span>';
        var usersCellTemplate = '<span> {{grid.getCellValue(row, col).getName()}}</span>';
        var experiencesCellTemplate = '<span> {{grid.getCellValue(row, col).getName()}}</span>';
        var projectsCellTemplate = '<span> {{grid.getCellValue(row, col).getName()}}</span>';
        var actionsCellTemplate = '<span> {{grid.getCellValue(row, col).getName()}}</span>';

        var gridData = {
          enableColumnResizing: true,
          enableColumnMenus: false,
          columnDefs: [{
              name: 'Nome',
              field: 'skill',
              enableColumnMenus: false,
              cellTemplate: nameCellTemplate,
              width: '20%'
            },
            {
              name: 'Pessoas',
              field: 'skill',
              cellTemplate: usersCellTemplate,
              width: '20%'
            },
            {
              name: 'Status',
              field: 'skill',
              cellTemplate: statusCellTemplate,
              width: '10%'
            },

            {
              name: 'Experiências',
              field: 'skill',
              cellTemplate: experiencesCellTemplate,
              width: '20%'
            },
            {
              name: 'Projetos',
              field: 'skill',
              cellTemplate: projectsCellTemplate,
              width: '20%'
            },
            {
              name: 'Ações',
              field: 'skill',
              cellTemplate: actionsCellTemplate,
              width: '10%'
            }
          ],
          data: []
        };
        angular.forEach(skills, function (v, i) {
          gridData.data[i] = {
            skill: v
          }
        });
        return gridData;
      }
    }


})();
