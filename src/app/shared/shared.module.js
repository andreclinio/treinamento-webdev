(function() {
  'use strict';

  angular
    .module('shared', [])
    .config(config);

/** @ngInject */
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
