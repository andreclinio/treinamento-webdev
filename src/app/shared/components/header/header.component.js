(function () {
	'use strict';

	angular
		.module('core')
		.component('ttHeaderPage', {
			templateUrl: 'app/shared/components/header/header.component.html',
			controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        user: '<'
      }
	});

	/** @ngInject */
	function controller() {
    var $ctrl = this;
		$ctrl.$onInit = function() {
      $ctrl.isNavCollapsed = true;
		}
  }


})();
