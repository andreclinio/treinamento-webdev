(function () {
  'use strict';

  angular
    .module('profile')
    .component('ttProfileCloud', {
      templateUrl: 'app/profile/cloud/cloud.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        user: '<'
      }
    });

  /** @ngInject */
  function controller(ttGuiUtilService) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
      updateWords();
    }

    $ctrl.$onDestroy = function () {
      angular.element('#wordsCloud').jQCloud('destroy');
    }

    var updateWords = function () {
      var skills = $ctrl.user.getSkills();
      $ctrl.words = [];
      angular.forEach(skills, function (s) {
        $ctrl.words.push({
          text: s.getName(),
          weight: s.getLevel(),
          handlers: {
            click: function() {
              showWord(s)
            }
          }
        });
      });
      var props = {
        delay: 10,
        shape: 'rectangular',
        height: 300,
        center: { x: 0.45, y: 0.5 },
        autoResize: true
      };
      angular.element('#wordsCloud').jQCloud($ctrl.words, props);
    }

    function showWord(s) {
      var html = '<div>';
      html += '<h2>Descrição: ' + (s.getDescription() != undefined ? s.getDescription() : "Não informada")  + '</h2>';
      html += '</div>';
      ttGuiUtilService.showMessage("Competência "+ s.getName(), html);
    }

  }

})();
