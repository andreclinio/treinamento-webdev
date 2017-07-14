(function () {
	'use strict';

	angular
		.module('core')
		.component('ttHeaderPage', {
			templateUrl: 'app/shared/components/header/header.component.html',
			controller: controller,
			controllerAs: '$ctrl'
	});

	/** @ngInject */
	function controller() {
  }


})();
