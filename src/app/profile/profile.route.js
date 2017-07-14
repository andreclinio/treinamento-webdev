(function () {
  'use strict';

  angular
    .module('profile')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider.state('private.profile', {
        url: '/profile',
        abstract: true,
        template: '<ui-view></ui-view>',
    });

    $stateProvider.state('private.profile.view', {
        url: '/view',
        template: '<tt-profile-view user="$ctrl.user"></tt-profile-view>',
        controllerAs: '$ctrl',
        controller: ['resolveUser', function (resolveUser) {
          console.log("U0: ", resolveUser);
          this.user = resolveUser;
        }],
     });

      $stateProvider.state('private.profile.edit', {
          url: '/edit',
          template: '<tt-profile-edit user="$ctrl.user"></tt-profile-edit>',
          controllerAs: '$ctrl',
          controller: ['resolveUser', function (resolveUser) {
            console.log("U1: ", resolveUser);
            this.user = resolveUser;
          }],
      });

  }

})();
