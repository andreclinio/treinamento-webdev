(function () {
  'use strict';

  angular
    .module('login')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider.state('public.login', {
      url: '/login',
      template: '<tt-login-page></tt-login-page>',
      controllerAs: '$ctrl'
  });

    $stateProvider.state('public.register', {
        url: '/register',
        template: '<tt-register></tt-register>',
        controllerAs: '$ctrl'
    });

    $stateProvider.state('public.recover', {
        url: '/recover',
        template: '<tt-recover></tt-recover>',
        controllerAs: '$ctrl'
     });
  }

})();
