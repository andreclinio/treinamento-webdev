(function () {
    'use strict';
  
    angular
      .module('search')
      .config(routerConfig);
  
    /** @ngInject */
    function routerConfig($stateProvider) {
  
      $stateProvider.state('private.search', {
          url: '/search',
          abstract: true,
          template: '<ui-view></ui-view>'
      });
  
      $stateProvider.state('private.search.view', {
          url: '/view',
          template: '<tt-search-view user="$ctrl.user"></tt-search-view>',
          controllerAs: '$ctrl',
          controller: ['resolveUser', function (resolveUser) {
            this.user = resolveUser;
          }]
       });
    }
  
  })();
  