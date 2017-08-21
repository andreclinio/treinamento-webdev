(function () {
    'use strict';

    angular
      .module('skill')
      .component('ttSkillTable', {
        templateUrl: 'app/skill/components/table/table.component.html',
        controller: controller,
        controllerAs: '$ctrl'
      });

    /** @ngInject */
    function controller($rootScope, $scope, $log, $state, skillDataService, ttGuiUtilService, ttModelUtilService) {
      var $ctrl = this;

      /**
       * Inicializador
       */
      $ctrl.$onInit = function () {
        $ctrl.skills = [];
        $ctrl.update();
        $ctrl.listener = $rootScope.$on("search.updated", function (event, skills) {
          $ctrl.update(skills);
        });
      }

      /**
       * Destrutor
       */
      $ctrl.$onDestroy = function () {
        $ctrl.listener();
      }

      /**
       * Abertura de form para novo skill.
       */
      $ctrl.openNewSkill = function () {
        $state.go("private.skill.new-skill");
      }

      /**
       * Atualização da tabela.
       */
      $ctrl.update = function (skills) {
        skills = skills || [];
        $ctrl.skills = skills;
      }

      /**
       * Contagem de elementos selecionados na tabela
       * @returns a quantidade
       */
      $ctrl.getSelectionCount= function() {
        var sel = _getSelection();
        return sel.length;
      }

      /**
       * Faz a combinação de competências selecionadas
       */
      $ctrl.mergeSelected = function() {
        var html = "<p> Competências combinadas:";
        html += _getSelectionText();
        // TODO
        ttGuiUtilService.showInfoMessage(null, html);
      }

      /**
       * Faz a deleção de competências selecionadas
       */
      $ctrl.deleteSelected = function() {
        var html = "<p> Deseja realmente apagar as competências?";
        html += _getSelectionText();
        var promisse = ttGuiUtilService.confirmWarningMessage(null, html, "Apagar");
        promisse.then(function () {
          // TODO
          var infoMsg = "Competência(s) apagada(s) com sucesso."
          ttGuiUtilService.showInfoMessage(null, infoMsg);
        }, function () {
          $log.log('operação cancelada');
        });
      }

      /**
       * Montagem de texto HTML com as competências selecionadas.
       * @returns o código HTML
       */
      function _getSelectionText() {
        var sel = _getSelection();
        var html = "<ul>";
        angular.forEach(sel, function (v) {
          html += "<li>" + v.getName();
        });
        html += "</ul>";
        return html;
      }

      /**
       * Montagem de lista de competências selecionadas
       * @returns um array.
       */
      function _getSelection() {
        var selection = [];
        angular.forEach($ctrl.skills, function (v) {
          if (v.selected) selection.push(v);
          });
        return selection;
      }

      /**
       * Monta um badge HTML para a competência com base na sua validação.
       */
      $ctrl.getSkillBadgeClass = function(s) {
        return ttGuiUtilService.getBadgeClassForSkillValidity(s.getValidated());
      }

      /**
       * Monta um texto para a competência com base na sua validação.
       */
      $ctrl.getSkillValidityName = function(s) {
        return ttModelUtilService.getSkillValidityName(s.getValidated());
      }

      /**
       * Apaga uma competência específica.
       */
      $ctrl.delSkill = function(skill) {
        var name = skill ? skill.getName() : "---";
        var warnMsg = "Deseja realmente apagar a competência '" + name + "'?";
        var promisse = ttGuiUtilService.confirmWarningMessage(null, warnMsg, "Apagar");
        promisse.then(function () {
          skillDataService.remove(skill);
          var infoMsg = "Competência '" + name + "'apagada com sucesso."
          ttGuiUtilService.showInfoMessage(null, infoMsg);
        }, function () {
        });
      }

      /**
       * Valida uma competência específica.
       */
      $ctrl.validateSkill = function(skill) {
        var name = skill ? skill.getName() : "---";
        skill.setValidated(true);
        skillDataService.update(skill);
        var infoMsg = "Competência '" + name + "'validada com sucesso."
        ttGuiUtilService.showInfoMessage(null, infoMsg);
      }

      /**
       * Edita título de uma competência específica.
       */
      $ctrl.editTitle = function (skill) {
        var prm = ttGuiUtilService.chooseString("Título", "Entre com o novo título.", skill.getName(), false, true);
        prm.then(function(string) {
          skill.setName(string);
          skillDataService.update(skill);
          ttGuiUtilService.showInfoMessage(null, "Título da competência ajustada.");
        },
        function() {
        })
        .catch(function (exception) {
          ttGuiUtilService.showErrorMessage(null, exception);
        });
      }
     
      /**
       * Mostra detalhes de uma competência específica.
       */
      $ctrl.showSkillDetails = function (skill) {
        var desc = skill.getDescription() || "(sem texto de descrição disponível)";
        var html = 
          '<h2>' + skill.getName() + '</h2>' +
          '<p>' + desc + '</p>';
        ttGuiUtilService.showMessage("Competência", html);
      }

      /**
       * Edita a descrição uma competência específica.
       */
      $ctrl.editDescription = function (skill) {
        var prm = ttGuiUtilService.chooseString("Descrição", "Entre com a nova descrição.", skill.getDescription(), true, false);
        prm.then(function(string) {
          skill.setDescription(string);
          skillDataService.update(skill);
          ttGuiUtilService.showInfoMessage(null, "Descrição da competência ajustada");
        },
        function() {
        })
        .catch(function (exception) {
          ttGuiUtilService.showErrorMessage(null, exception);
        });
      }
      
    }


})();
