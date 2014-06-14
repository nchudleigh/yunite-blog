(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    angular.module('app', [
        'ui.router'
      , 'ui.bootstrap'
      , 'ui.select2'
      , 'pascalprecht.translate'
      , 'angular-growl'
      , 'navigation'
      , 'footer'
      , 'home'
    ])
    
    .config(function($stateProvider, $sceProvider, $urlRouterProvider, $logProvider, $translateProvider, growlProvider) {
        $urlRouterProvider.otherwise('home');
        
        $sceProvider.enabled(true);
                
        $translateProvider.preferredLanguage('en');
        $logProvider.debugEnabled(false);
        growlProvider.globalTimeToLive(5000);
    })
        
;}(window, document, location, navigator, jQuery, angular, undefined));