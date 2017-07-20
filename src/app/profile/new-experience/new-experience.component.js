(function () {
  'use strict';

  angular
    .module('profile')
    .component('ttProfileNewExperience', {
      templateUrl: 'app/profile/new-experience/new-experience.component.html',
      controller: controller,
      controllerAs: '$ctrl'
    });

  /** @ngInject */
  function controller($rootScope, $log, Experience, ttUtilService, userDataService, projectDataService) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      var eventName = ttUtilService.mountFormOperationEventName("newExperienceForm");
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
    }

    $ctrl.$onDestroy = function () {
      $ctrl.listener();
    }

    $ctrl.addExperience = function (user) {
      var title = $ctrl.title;
      var project = $ctrl.project;
      var startDate = $ctrl.startDate;
      var endDate = $ctrl.endDate;
      var description = $ctrl.description;
      $log.log("Add exp: ", user, title, project, startDate, endDate, description);

      try {
        var experience = new Experience(title);
        experience.setProject(project);
        experience.setStartDate("01/2000");
        experience.setEndDate("01/2005");
        experience.setDescription(description);
        user.addExperience(experience);
        userDataService.update(user);
        var infoMsg = "Experiência '" + title + "'inserida com sucesso."
        ttUtilService.showInfoMessage(null, infoMsg);
      } catch (exception) {
        ttUtilService.showErrorMessage(null, exception);
      }
    }
  }

})();
