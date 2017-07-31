(function() {
    'use strict';

    angular
        .module('shared')
        .directive('ttEmailTecgraf', directive);

    /** @ngInject */
    function directive() {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                elem.on('keyup', function () {
                    scope.$apply(function () {
                        var email = elem.val();
                        ctrl.$setValidity('ttemailtecgraf', email.endsWith("@tecgraf.puc-rio.br") );
                    });
                });
            }
        };
    }
})();
