(function() {
  'use strict';

  angular
    .module('core')
    .component('ttProfileExperiences', {
      templateUrl: 'app/profile/experiences/experiences.component.html',
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
