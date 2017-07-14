(function () {
	'use strict';

	angular
		.module('core')
		.component('ttMainPage', {
			templateUrl: 'app/shared/components/main/main.component.html',
			controller: controller,
			controllerAs: '$ctrl'
	});

	/** @ngInject */
	function controller() {
  }


})();
