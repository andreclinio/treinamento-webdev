(function () {
  'use strict';

  angular
    .module('profile')
    .component('ttProfileNewSkillUser', {
      templateUrl: 'app/profile/new-skill-user/new-skill-user.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      binding: {
        callback: '&'
      }
    });

  /** @ngInject */
  function controller($rootScope, $log, Experience, ttGuiUtilService, userDataService, skillDataService, SkillUser) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.level = "1";
      var eventName = ttGuiUtilService.mountFormOperationEventName("newSkillUserForm");
      $ctrl.listener = $rootScope.$on(eventName, function (event, data) {
        if (!data) return;
        $ctrl.addSkillUser(data);
      });

      $ctrl.skills = [];
      var prm = skillDataService.list();
      prm.then(function (skills) {
        angular.forEach(skills, function (s) {
          $ctrl.skills.push(s);
        });
      }, function () {});
    }

    $ctrl.$onDestroy = function () {
      $ctrl.listener();
    }

    $ctrl.addSkillUser = function (data) {
      var skill = $ctrl.skill;
      var level = $ctrl.level;
      try {
        var skillUser = new SkillUser(skill, parseInt(level));
        var cb = data.callback;
        cb(data, skillUser);
      } catch (exception) {
        ttGuiUtilService.showErrorMessage(null, exception + "");
      }
    }

  }

})();
