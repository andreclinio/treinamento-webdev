(function () {
    'use strict';
  
    angular
      .module('global')
      .config(routerConfig);
  
    /** @ngInject */
    function routerConfig($stateProvider) {
  
      $stateProvider.state('private.global', {
          url: '/global',
          abstract: true,
          template: '<ui-view></ui-view>'
      });
  
      $stateProvider.state('private.global.view', {
          url: '/view',
          template: '<tt-global-view></tt-global-view>',
          controllerAs: '$ctrl',
          controller: ['resolveUser', function (resolveUser) {
            this.user = resolveUser;
          }]
       });
    }
  
  })();
  