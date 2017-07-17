(function () {
	'use strict';

	angular
		.module('profile')
		.component('ttExample', {
			templateUrl: 'app/profile/example/example.component.html',
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
