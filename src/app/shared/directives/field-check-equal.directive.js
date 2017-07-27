(function() {
    'use strict';

    angular
        .module('shared')
        .directive('ttFieldCheckEqual', directive);

    /** @ngInject */
    function directive() {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                elem.on('keyup', function () {
                    scope.$apply(function () {
                        var otherVal = scope.$ctrl[attrs.ttFieldCheckEqual];
                        var myVal = elem.val();
                        ctrl.$setValidity('ttfieldcheckequal', myVal === otherVal );
                    });
                });
            }
        };
    }
})();
