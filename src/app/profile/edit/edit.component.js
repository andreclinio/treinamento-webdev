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
  function controller($rootScope, $scope, $state, ttGuiUtilService, userDataService) {
    var $ctrl = this;

    /**
     * Inicializador
     */
    $ctrl.$onInit = function () {
      $ctrl.name = $ctrl.user.getName();
      $ctrl.email = $ctrl.user.getEmail();
      $ctrl.lattes = $ctrl.user.getLattes();
      $ctrl.linkedin = $ctrl.user.getLinkedIn();

      $ctrl.options = [
        { text: "Cancelar", callback: $ctrl.cancel },
        { text: "Alterar", class: "primary", callback: $ctrl.updateUser }
      ];

      $ctrl.listener = $rootScope.$on('$stateChangeStart', function (event) {
        if($scope.editProfileForm.$dirty) {
          event.preventDefault();
          var content = "Deseja realmente sair sem salvar suas alterações?";
          var prm = ttGuiUtilService.confirmWarningMessage(null, content);
          prm.then(function() {
            $ctrl.listener();
            $scope.editProfileForm.$setPristine();
            $ctrl.cancel();
          }, function() {
          });
        }
      });
    }

    /**
     * Destrutor
     */
    $ctrl.$onDestroy = function () {
      $ctrl.listener();
    }

    /**
     * Cancelamento da operação
     */
    $ctrl.cancel = function () {
      $state.go("private.profile.view");
    }

    /**
     * Atualização dos dados do usuário.
     */
    $ctrl.updateUser = function () {
      $ctrl.user.setName($ctrl.name);
      $ctrl.user.setLattes($ctrl.lattes);
      $ctrl.user.setLinkedIn($ctrl.linkedin);

      try {
        userDataService.update($ctrl.user);
        var infoMsg = "Atualização do usuário feita com sucesso."
        ttGuiUtilService.showInfoMessage(null, infoMsg);
        $state.go("private.profile.view");
      } catch (exception) {
        ttGuiUtilService.showErrorMessage(null, exception);
      }
    }
  }

})();
