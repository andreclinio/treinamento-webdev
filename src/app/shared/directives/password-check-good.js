(function() {
    'use strict';

    angular
        .module('shared')
        .directive('ttPasswordCheckGood', directive);

    /** @ngInject */
    function directive() {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var validate = function(pwd) {
                    if (pwd.length < 8) {
                        return false;
                    }
                    if (pwd.search(/\d/) === -1) {
                        return false;
                    }
                    if (pwd.search(/[A-Z]/) === -1) {
                        return false;
                    }
                    if (pwd.search(/[a-z]/) === -1) {
                        return false;
                    }
                    return true;
                };
                
                elem.on('keyup', function () {
                    scope.$apply(function () {
                        ctrl.$setValidity('ttpasswordcheckgood', validate(elem.val()));
                    });
                });
            }
        }
    }    

})();
