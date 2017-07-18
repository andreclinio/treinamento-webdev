(function () {
	'use strict';

	angular
		.module('profile')
		.component('ttProfileNewExperience', {
			templateUrl: 'app/profile/new-experience/new-experience.component.html',
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
