(function() {
    'use strict';

    angular
        .module('shared')
        .factory('ttUtilService', service);

	/** @ngInject */
    function service($uibModal) {
       return {
          showMessage: showMessage
       }
       
       /**
        * Mostra mensagem na tela
        *
        * @param {string} text texto a ser exibido.
        */
       function showMessage(title, text){
          var modalInstance = $uibModal.open({
           animation: true,
           controller: function() {
               var $ctrl = this;
               $ctrl.ok = function() {
                   modalInstance.close();
               }
           },
           controllerAs: '$ctrl',
           template: '<div class="modal-header"><h1>' + title + '</h1></div>' +
                     '<div class="modal-body">' + 
                     text + 
                     '</div>' +
                     '<div class="modal-footer">' + 
                     '<button class="btn" type="button" ng-click="$ctrl.ok()">OK</button>' +
                     '</div>' 
          });
          modalInstance.result.then(function() {
          }, function () {
          });
        }
    }


})();
