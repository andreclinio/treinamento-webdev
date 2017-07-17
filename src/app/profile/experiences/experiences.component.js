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
  function controller($log) {
    var $ctrl = this;

    $ctrl.mountGridData = function(experiences) {
      var gData = { 
        columnDefs: [ 
          { name: 'Nome', field: 'name'},
          { name: 'Data', field: 'date'},
          { name: 'Competências', field: 'skills'},
          { name: 'Projeto', field: 'project', cellTemplate: '<span class="badge">{{grid.getCellValue(row, col)}}</span>'},
          { name: '', field: 'delete', cellTemplate: '<button ng-click="x()"><span class="fa fa-trash"></span></button>'}
        ],
        data: []
      };

      for (var i = 0; i < experiences.length; i++) {
         var exp = experiences[i];
         gData.data[i] = {
           name: exp.getDescription(),
           date: exp.getStartDate() + " - " + exp.getEndDate(),
           skills: "",
           project: exp.getProject().getName(),
           delete: exp
         };

         var skills = exp.getSkills();
         var skillsData = "";
         for (var s = 0; s < skills.length; s++) {
           var sk = skills[s];
           var skName = sk.getSkill().getName();
            skillsData += skName + " ";
         }
         gData.data[i].skills = skillsData;
      }
      return gData;
    }
    
    $ctrl.delExperience = function(experience) {
       $log.log("Apagando", experience);
    }

    $ctrl.$onInit = function() {
      $ctrl.gridData = $ctrl.mountGridData($ctrl.user.getExperiences());
      $log.log($ctrl.user.getExperiences());
    }
  }


})();
