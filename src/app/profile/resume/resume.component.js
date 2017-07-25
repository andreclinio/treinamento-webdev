(function() {
  'use strict';

  angular
    .module('profile')
    .component('ttProfileResume', {
      templateUrl: 'app/profile/resume/resume.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        user: '<'
      }
    });

  /** @ngInject */
  function controller() {
    var $ctrl = this;
    $ctrl.$onInit = function() {}
  }


})();
