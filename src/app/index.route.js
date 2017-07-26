(function () {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/public/login');

    $stateProvider
      .state('test-page', {
        url: '/test-page',
        template: '<tt-test-page></tt-test-page>'
      });

    $stateProvider
      .state('private', {
        url: '/private',
        template: '<tt-main-page></tt-main-page>',
        resolve: {
          resolveUser: ['userDataService', '$location', function (userDataService, $location) {
            var email = "clinio@tecgraf.puc-rio.br";
            // var email = $location.search().email;
            var result = userDataService.get(email);
            return result;
          }]
        }
      });

    $stateProvider
      .state('public', {
        url: '/public',
        abstract: true,
        template: '<ui-view></ui-view>'
      });

  }

})();
