(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    angular.module('home', [
        'home.controller'
      , 'home.model'
    ])

    .config(function($stateProvider) {
        $stateProvider.state('home', {
            url: '/home'
          , onEnter: function($timeout) {
                $timeout(function() {
                    $('[ui-view=navigation]').css({display:'block'});
                    $('[ui-view=footer]').css({display:'block'});
                    $('[ui-view=home]').css({display:'block'});                    
                });
            }
          , onExit: function() {
                $('[ui-view=home]').css({display:'none'});
            }
          , views: {
                'navigation': {
                    controller: 'navigationController'
                  , templateUrl: '/library/modules/navigation/views/navigation.html'
                }
              , 'footer': {
                    controller: 'footerController'
                  , templateUrl: '/library/modules/footer/views/footer.html'
                }
              , 'home': {
                    controller: 'homeController'
                  , templateUrl: '/library/modules/home/views/home.html'
                }
            }
        });
    })

;}(window, document, location, navigator, jQuery, angular, undefined));