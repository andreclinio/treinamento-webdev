(function () {
  'use strict';

  angular
    .module('search')
    .component('ttSearchPeople', {
      templateUrl: 'app/search/components/people/people.component.html',
      controller: controller,
      controllerAs: '$ctrl'
    });

  /** @ngInject */
  function controller($rootScope, $scope, $log, skillDataService, ttGuiUtilService) {
    var $ctrl = this;

    $ctrl.getBadgeClassForSkillLevel = function (level) {
      return ttGuiUtilService.getBadgeClassForSkillLevel(level);
    }

    $ctrl.update = function (skills) {
      $ctrl.skills = skills;
      var names = [];
      angular.forEach($ctrl.skills, function (sk) {
        names.push(sk.getName());
      });

      var prm = skillDataService.users(names);
      prm.then(function (searchUsers) {
        $scope.$apply(function () {
          $ctrl.searchUsers = searchUsers;
        });
      }, function (obj) {
        $ctrl.searchUsers = [];
        ttGuiUtilService.showErrorMessage(null, "Falha na busca de pessoas: " + obj);
      }).catch(function (ex) {
        $ctrl.searchUsers = [];
        ttGuiUtilService.showErrorMessage(ex);
      })
    }

    $ctrl.$onInit = function () {
      $ctrl.searchUsers = [];
      $ctrl.update([]);
      $ctrl.listener = $rootScope.$on("search.updated", function (event, skills) {
        $ctrl.update(skills);
      });
    }

    $ctrl.$onDestroy = function () {
      $ctrl.listener();
    }

  }


})();
