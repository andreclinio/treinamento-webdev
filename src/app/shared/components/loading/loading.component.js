(function() {
"use strict";

angular.module('shared')
.component('loading', {
  template: '<img src="assets/images/spinners/hourglass.svg" ng-if="$ctrl.show">',
  controller: LoadingController,
  controllerAs: '$ctrl'
});


// LoadingController.$inject = ['$rootScope']
/** @ngInject */
function LoadingController ($rootScope, $log) {
  var $ctrl = this;
  var listener;

  $ctrl.$onInit = function() {
    $ctrl.show = false;
    listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
  };

  $ctrl.$onDestroy = function() {
    listener();
  };

  function onSpinnerActivate(event, data) {
    $log.log("[DEBUG] data.on: ", data.on);
    $ctrl.show = data.on;
  }
}

})();
