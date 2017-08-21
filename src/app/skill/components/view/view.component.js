(function () {
  'use strict';

  angular
    .module('skill')
    .component('ttSkillView', {
      templateUrl: 'app/skill/components/view/view.component.html',
      controller: controller,
      controllerAs: '$ctrl'
    });

  /** @ngInject */
  function controller($q, $rootScope, skillDataService) {
    var $ctrl = this;
    $ctrl.showNew = true;

    /**
     * Inicializador
     */
    $ctrl.$onInit = function () {
      $ctrl.skills = [];
    }
    /**
     * Destrutor
     */
    $ctrl.$onDestroy = function () {}

    /**
     * Faz a promessa de lista de competências com base em uma string de busca
     */
    $ctrl.loadSkills = function (query) {
      return _buildQueryPromisse(query, $ctrl.showNew);
    }

    /**
     * Sinaliza para compoentes que houve atualização de lista selecionada.
     */
    $ctrl.update = function () {
      $rootScope.$emit("search.updated", $ctrl.skills);
    }

    /**
     * Faz a remontagem da lista de competências selecionadas pela atualização do filtro.
     */
    $ctrl.updateFilter = function() {
      $ctrl.skills = _filterQuery($ctrl.skills, $ctrl.showNew);
      $ctrl.update();
    }

    /**
     * Com base em uma lista de competências, faz a eventual filtragem com base no atributo "validado".
     * @param {*} skills lista de entrada
     * @param {*} showNew flag indicativo que o usuário quer ver as competências novas (não validadas).
     * @returns {*} a lista de competências.
     */
    function _filterQuery(skills, showNew) {
      if (!showNew) {
        skills = skills.filter(
          function (s) {
            if (s.getValidated()) return true;
            return false;
          }
        )
      }
      return skills;
    }

    /**
     * Monta uma promessa de busca de competências
     * @param {*} query sting de busca
     * @param {*} showNew indicativo de visualização de "novos".
     * @returns a promessa.
     */
    function _buildQueryPromisse(query, showNew) {
      var deferred = $q.defer();

      var errorHandler = function (error) {
        deferred.reject(error);
      };

      skillDataService.search(query).then(
        function (sks) {
          sks = _filterQuery(sks, showNew);
          deferred.resolve(sks);
        },
        function (er) {
          errorHandler(er);
        }
      );

      return deferred.promise;
    }
  }


})();
