(function () {
    'use strict';
  
    angular
      .module('skill')
      .config(routerConfig);
  
    /** @ngInject */
    function routerConfig($stateProvider) {
  
      $stateProvider.state('private.skill', {
          url: '/skill',
          abstract: true,
          template: '<ui-view></ui-view>'
      });
  
      $stateProvider.state('private.skill.view', {
          url: '/view',
          template: '<tt-skill-view user="$ctrl.user"></tt-skill-view>',
          controllerAs: '$ctrl',
          controller: ['resolveUser', function (resolveUser) {
            this.user = resolveUser;
          }]
       });

       $stateProvider.state('private.skill.new-skill', {
        url: '/new-skill',
        template: '<tt-skill-new-skill user="$ctrl.user"></tt-skill-new-skill>',
        controllerAs: '$ctrl',
        controller: ['resolveUser', function (resolveUser) {
          this.user = resolveUser;
        }]
     });

    }
  
  })();
  