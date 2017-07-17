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
        template: '<ui-view></ui-view>'
    });

    $stateProvider.state('private.profile.view', {
        url: '/view',
        template: '<tt-profile-view user="$ctrl.user"></tt-profile-view>',
        controllerAs: '$ctrl',
        controller: ['resolveUser', function (resolveUser) {
          this.user = resolveUser;
        }]
     });

      $stateProvider.state('private.profile.edit', {
          url: '/edit',
          template: '<tt-profile-edit user="$ctrl.user"></tt-profile-edit>',
          controllerAs: '$ctrl',
          controller: ['resolveUser', function (resolveUser) {
            this.user = resolveUser;
          }]
      });

    $stateProvider
      .state('private.profile.example', {
        url: '/example',
        template: '<tt-example  user="$ctrl.user"></tt-example>',        
          controllerAs: '$ctrl',
          controller: ['resolveUser', function (resolveUser) {
            this.user = resolveUser;
          }]
      });
  }

})();
