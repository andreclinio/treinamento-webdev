(function() {
    'use strict';
  
    angular
      .module('search')
      .component('ttSearchCloud', {
        templateUrl: 'app/search/components/cloud/cloud.component.html',
        controller: controller,
        controllerAs: '$ctrl',
        bindings: {
        }
      });
  
    /** @ngInject */
    function controller() {
      var $ctrl = this;
      $ctrl.$onInit = function() {
        updateWords();
      }
  
      $ctrl.$onDestroy = function() {
        angular.element('#wordsCloud').jQCloud('destroy');
      }
  
      var updateWords = function() {
        var skills = [ "A", "B", "C"];
        $ctrl.words = [];
        angular.forEach(skills, function(s) {
          $ctrl.words.push({ text: s, weight: 1});
        });
        var props = { delay: 10, shape: 'rectangular', height: 300, center: { x: 0.45, y: 0.5 } };
        angular.element('#wordsCloud').jQCloud($ctrl.words, props);
      }
    }
  
  })();
  