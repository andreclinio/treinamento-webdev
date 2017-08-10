(function () {
    'use strict';
  
  angular
    .module('shared')
    .factory('ttModelUtilService', service);

  /** @ngInject */
  function service($log, userDataService) {
    return {
      hasUserWithEmail: hasUserWithEmail,
      checkPassword: checkPassword,
      stringToDate: stringToDate,
      dateToString: dateToString,
      getSkillLevelName: getSkillLevelName,
      getSkillValidityName: getSkillValidityName
    };


    /**
     * Retorna o nome de um nível de competência.
     * @param {int} level nível
     * @return (string} texto.
     */
    function getSkillLevelName(level) {
      if (level == 1) {
        return "Básico";
      }
      else if (level == 2) {
        return "Médio";
      }
      else if (level == 3) {
        return "Avançado";
      }
      else {
        return "";
      }
    }

    /**
     * Retorna o nome de uma validação de competência.
     * @param {boolean} validity flag de valido.
     * @return (string} texto.
     */
    function getSkillValidityName(validity) {
      if (validity) {
        return "Validado";
      }
      return "Novo";
    }

    function checkPassword(email, password) {
      if (password != "1234") return false;
      return true;
    }

    function hasUserWithEmail(email) {
      var hasUser = { value: false };
      var prm = userDataService.get(email);
      prm.then(function () {
        hasUser.value = true;
      }, function () {
        hasUser.value = false;
      })
      .catch(function (exception) {
        $log.log("" + exception);
      });
      return hasUser.value;
    }

    function stringToDate (text) {
      if (!text) return new Date();
      try {
        var split = text.split("/");
        var m = parseInt(split[0]) - 1;
        var y = parseInt(split[1]);
        var date = new Date(y, m);
        return date;
      }
      catch (exception) {
        $log.log(exception);
        return new Date();
      }
    }

     function dateToString (date) {
      var newdate = new Date(Date.parse(date));
      var dtTxt = (newdate.getMonth()+1) + "/" + newdate.getFullYear();
      if (dtTxt.length < 7) dtTxt = "0" + dtTxt;
      return dtTxt;
    }
  }


})();

