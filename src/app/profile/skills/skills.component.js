(function() {
  'use strict';

  angular
    .module('core')
    .component('ttProfileSkills', {
      templateUrl: 'app/profile/skills/skills.component.html',
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
