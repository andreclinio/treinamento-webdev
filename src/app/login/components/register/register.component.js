(function () {
  'use strict';

  angular
    .module('login')
    .component('ttRegister', {
      templateUrl: 'app/login/components/register/register.component.html',
      controller: controller,
      controllerAs: '$ctrl'
    })
    .directive('pwCheckGood', pwCheckGood)
    .directive('fieldCheckEqual', fieldCheckEqual);

    
    /** @ngInject */    
    function fieldCheckEqual() {
      return {
          require: 'ngModel',
          link: function (scope, elem, attrs, ctrl) {
              elem.on('keyup', function () {
                  scope.$apply(function () {
                      var otherVal = scope.$ctrl[attrs.pwCheckEqual];
                      var myVal = elem.val();
                      ctrl.$setValidity('fieldcheckequal', myVal === otherVal );
                  });
              });
          }
      };
    }

    /** @ngInject */
    function pwCheckGood() {
      return {
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
                      ctrl.$setValidity('pwcheckgood', validate(elem.val()));
                  });
              });
          }
      };
  }

  /** @ngInject */
  function controller($log, $state, ttUtilService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
    }

    $ctrl.onDestroy = function () {
    }

    $ctrl.register = function () {
      var email = $ctrl.email;
      if ($ctrl.exists(email)) {
         ttUtilService.showErrorMessage("Registro", "Já existe usuário cadastrado com esse email!");
         return;
      }
      var msg = "O pedido de confirmação de registro foi enviado para: " + email + ".";
      ttUtilService.showMessage("Recuperação de Senha", msg);
      $state.go("public.login");
    }

    $ctrl.exists = function(email) {
      if (email == "clinio@tecgraf.puc-rio.br") return true;
      return false;
    }

  }

})();
