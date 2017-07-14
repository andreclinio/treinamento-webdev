(function () {
	'use strict';

	angular
		.module('core')
		.component('ttProfileCloud', {
			templateUrl: 'app/profile/cloud/cloud.component.html',
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

		}
	}

})();
