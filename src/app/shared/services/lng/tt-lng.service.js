(function () {
  'use strict';

  angular
    .module('shared')
    .factory('ttLng', service)
    .config(Config);

  /** @ngInject */
  function Config($translateProvider) {
    $translateProvider.translations('en', _getEN()); 
    $translateProvider.translations('pt', _getPT()); 
    $translateProvider.translations('fr', _getFR()); 
    
    //temos que dizer qual é a default.
    $translateProvider.preferredLanguage('pt'); 
    $translateProvider.useSanitizeValueStrategy('escape');
  } 

  /** @ngInject */
  function service($translate) {

    return {
      get: get,
      setLanguage: setLanguage,
      getLanguage: getLanguage,
      getIconNameFor: getIconNameFor,
      getAllSupportedLanguages: getAllSupportedLanguages
    };

    /**
     * Consulta de string de 18n com base em uma tag
     */
    function get(tag) {
      return $translate.instant(tag);
    }

    /**
     * Ajusta de tag de idioma
     */
    function setLanguage(lng) {
        return $translate.use(lng);
    }

    /**
     * Consulta de tag de idioma
     */
    function getLanguage() {
        return $translate.use();
    }

    function getAllSupportedLanguages() {
        return [ 'pt', 'en', 'fr'];
    }

    function getIconNameFor(lng) {
        if (getLanguage() === lng) return lng + '-on.png';
        return lng + '-off.png';
    }
  }

  function _getPT() {
    return { 
        'tt.cancel.button': 'Cancelar',
        'tt.confirm.button': 'Confirmar',
        'tt.back.button': 'Voltar',
        'tt.email.placeholder': 'Email do usuário',
        'tt.name.placeholder': 'Nome do usuário',
        'tt.password.placeholder': 'Senha do usuário',
        'tt.no.data.error': 'Campo obrigatório!',
        'tt.invalid.email.error': 'Email inválido.',
        'tt.no.tecgraf.email.error': 'Somente emails domínio Tecgraf são válidos!',
        'tt.weak.password.error' : "A senha deve conter maiúsculas, minúsculas, números e, pelo menos, oito caracteres!",
        'tt.password.mismatch.error': "Senha e confimação estão diferentes!",

        'login.title': 'Entrada no Sistema',
        'login.error.title': 'Falha de login',
        'login.bad.error': 'Senha errada.',
        'login.no.user.error': 'Usuário inexistente no sistema!',
        'login.forget.link': 'Esqueci minha senha!',
        'login.login.button': 'Entrar',
        'login.register.button': 'Cadastrar',
        'login.remember.check': 'Lembre-se de mim',
        'login.show.password.check': 'Mostrar senha',

        'recover.title': 'Recuperação de Senha',
        'recover.recover.button': 'Recuperar',
        
        'register.title': 'Registro de Usuário',
        'register.email.mismatch.error': "Email e confimação estão diferentes!",
        'register.show.password.check': "Mostrar senhas",
        'register.register.button': "Cadastrar",
    }
  }

  function _getEN() {
    return { 
        'tt.cancel.button': 'Cancel',
        'tt.confirm.button': 'Confirm',
        'tt.back.button': 'Back',
        'tt.email.placeholder': 'User email',
        'tt.name.placeholder': 'User name',
        'tt.password.placeholder': 'User password',
        'tt.no.data.error': 'Required field!',
        'tt.invalid.email.error': 'Invalid email.',
        'tt.no.tecgraf.email.error': 'Only Tecgraf domain emails are valid!',
        'tt.weak.password.error' : "The password must contain uppercase, lowercase, numbers and at least eight characters!",
        'tt.password.mismatch.error': "Password and confirmation are different!",

        'login.title': 'System Login',
        'login.error.title': 'Login Failure',
        'login.bad.error': 'Bad password.',
        'login.no.user.error': 'This user is not registered.',
        'login.forget.link': 'Forgot my password!',
        'login.login.button': 'Login',
        'login.register.button': 'Register',
        'login.remember.check': 'Remember me',
        'login.show.password.check': 'Show password',

        'recover.title': 'Password Recovery',
        'recover.recover.button': 'Recover',
        
        'register.title': 'User Registration',
        'register.email.mismatch.error': "Email and confirmation are different!",
        'register.show.password.check': "Show passwords",
        'register.register.button': "Register",
    }
  }


  function _getFR() {
    return { 
        'tt.cancel.button': 'Annuler',
        'tt.confirm.button': 'Confirmer',
        'tt.back.button': 'Retourner',
        'tt.email.placeholder': 'Courrier électronique de l\'utilisateur',
        'tt.password.placeholder': 'Mot de passe de l\'utilisateur',
        'tt.name.placeholder': 'Nom d\'utilisateur',
        'tt.no.data.error': 'Information requise!',
        'tt.invalid.email.error': 'Email invalide.',
        'tt.no.tecgraf.email.error': 'Seuls les emails de domaine Tecgraf sont valides!',
        'tt.weak.password.error' : "Le mot de passe doit contenir des majuscules, des minuscules, des chiffres et au moins huit caractères!",
        'tt.password.mismatch.error': "Le mot de passe et la confirmation sont différents!",

        'login.title': 'Connexion Système',
        'login.error.title': 'Erreur d\'authentification',
        'login.bad.error': 'Mauvais mot de passe.',
        'login.no.user.error': 'Cet utilisateur n\'est pas enregistré.',
        'login.forget.link': 'J\'ai oublié mon mot de passe!',
        'login.login.button': 'Entrer',
        'login.register.button': 'Registre',
        'login.remember.check': 'Souviens toi de moi',
        'login.show.password.check': 'Montrer le mot de passe',

        'recover.title': 'Récupération de mot de passe',
        'recover.recover.button': 'Récupérer', 

        'register.title': 'Enregistrement de l\'utilisateur',
        'register.email.mismatch.error': "",
        'register.show.password.check': "Afficher les mots de passe",
        'register.register.button': "Registre",
    }
  }


})();
