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
    // $ctrl.projects = [ "a", "x"];
    $ctrl.$onInit = function () {
      $log.log("Ps", $ctrl.projects);
      $ctrl.outProjectId = !$ctrl.objProject.project ? $ctrl.projects[0].getId() : $ctrl.objProject.project.getId();
      $log.log("Pid", $ctrl.outProjectId);
    }

    $ctrl.$onDestroy = function () {
    }

    $ctrl.update = function() {
       $ctrl.objProject.project = findProjectFromId($ctrl.outProjectId);
    }

    function findProjectFromId(id) {
        var prjs = $ctrl.projects;
        for (var i = 0; i < prjs.length; i++) {
            var prj = prjs[i];
            if (prj.getId() == id) {
                $log.log("find", prj);
                return prj;
            }
        }
        $log.log("find null", prjs);
        return null;
    }
  }

})();
