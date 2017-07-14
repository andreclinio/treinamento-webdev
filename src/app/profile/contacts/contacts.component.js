(function () {
	'use strict';

	angular
		.module('core')
		.component('ttProfileContacts', {
			templateUrl: 'app/profile/contacts/contacts.component.html',
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
