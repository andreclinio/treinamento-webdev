(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/private');

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
               var email = "rodnei@tecgraf.puc-rio.br";
               // var email = $location.search().email;
               var result = userDataService.get(email);
               console.log("private", email);
               return result;
             }]
           }
       });
  }

})();
