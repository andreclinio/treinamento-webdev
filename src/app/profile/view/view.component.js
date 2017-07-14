(function() {
  'use strict';

  angular
    .module('core')
    .component('ttProfileView', {
      templateUrl: 'app/profile/view/view.component.html',
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
