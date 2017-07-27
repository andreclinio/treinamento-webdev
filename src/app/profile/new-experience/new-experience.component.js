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
  function controller($rootScope, $log, Experience, ttGuiUtilService, userDataService, projectDataService) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      var eventName = ttGuiUtilService.mountFormOperationEventName("newExperienceForm");
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

      $ctrl.startDate = new Date();
      $ctrl.endDate = new Date();
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
        experience.setStartDate(ttGuiUtilService.dateToString($ctrl.startDate));
        experience.setEndDate(ttGuiUtilService.dateToString($ctrl.endDate));
        experience.setDescription(description);
        user.addExperience(experience);
        userDataService.update(user);
        var infoMsg = "Experiência '" + title + "'inserida com sucesso."
        ttGuiUtilService.showInfoMessage(null, infoMsg);
      } catch (exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      }
    }
  }

})();
