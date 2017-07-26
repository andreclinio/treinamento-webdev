(function () {
  'use strict';

  angular
    .module('profile')
    .component('ttProfileEdit', {
      templateUrl: 'app/profile/edit/edit.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        user: '<'
      }
    });

  /** @ngInject */
  function controller($state, ttUtilService, userDataService) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.name = $ctrl.user.getName();
      $ctrl.email = $ctrl.user.getEmail();
      $ctrl.lattes = $ctrl.user.getLattes();
      $ctrl.linkedin = $ctrl.user.getLinkedIn();
    }

    $ctrl.updateUser = function () {
      $ctrl.user.setName($ctrl.name);
      $ctrl.user.setLattes($ctrl.lattes);
      $ctrl.user.setLinkedIn($ctrl.linkedin);

      try {
        userDataService.update($ctrl.user);
        var infoMsg = "Atualização do usuário feita com sucesso."
		ttUtilService.showInfoMessage(null, infoMsg);
		$state.go("private.profile.view");
      } catch (exception) {
        ttUtilService.showErrorMessage(null, exception);
      }
    }
  }

})();
