(function () {
  'use strict';

  angular
    .module('shared')
    .component('ttProjectChooser', {
      templateUrl: 'app/shared/components/project-chooser/project-chooser.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        objProject: '<',
        projects: '<'
      }
    });

  /** @ngInject */
  function controller($log) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      $log.log("Ps", $ctrl.projects);
      $ctrl.project = !$ctrl.objProject.project ? $ctrl.projects[0] : $ctrl.objProject.project;
      $log.log("Pid", $ctrl.project);
    }

    $ctrl.$onDestroy = function () {
    }

    $ctrl.update = function() {
      $log.log("[DEBUG] onUpdate: ", $ctrl.project);
      $ctrl.objProject.project =  $ctrl.project;
    }
  }

})();
