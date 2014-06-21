(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    var app = angular.module('app', [
        'ui.router'
      , 'ui.bootstrap'
      , 'ui.select2'
      , 'pascalprecht.translate'
      , 'angular-growl'
      , 'sharedData'
      , 'directive.blogpost'
      , 'directive.card'
      , 'directive.sharebuttons'
      , 'blogposts'
      , 'sidebar'
      , 'topbar'
      , 'ngRoute'
      , 'ngTouch'
    ])
    
    .config(function($locationProvider,$routeProvider, $sceProvider, growlProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider
        .when('/', {
          templateUrl: "library/modules/blogposts/views/blog.html",
          controller : "sidebarController"
        }).when('/post/:id',{
          templateUrl: "library/modules/blogposts/views/blog.html",
          controller : "sidebarController",
          reloadOnSearch : false
        }).otherwise({
          redirectTo: '/'
        } );

        $sceProvider.enabled(true);
                
        growlProvider.globalTimeToLive(5000);
    
        //$rootScope.mobileTransition = 700;
        //$location.path('/post/13').replace().notify(false);
    });

}(window, document, location, navigator, jQuery, angular, undefined));