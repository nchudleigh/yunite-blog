(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    var app = angular.module('app', [
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
    
    });

    app.controller("blogController",['$scope',function($scope){

      $scope.resizeContent = function()
      {
        var currentWidth = window.innerWidth - $(".drawer").width();
        $(".content").width(currentWidth);
      }

      angular.element(window).bind('resize',$scope.resizeContent);

    }]);

    app.directive("card",function(){

        return {
          restrict : 'E',
          replace : 'true',
          templateUrl : 'library/directives/card/card.html',
          link : function(scope, element)
          {
            element.bind('click',function(){
              $(".card").removeClass("currentCard");
              element.addClass("currentCard");
              
              $(".drawer").animate({scrollTop: ""+(element.offset().top - element.parent().offset().top - element.parent().scrollTop()- $(".drawer").height()/2+ element.height()/2)+"px"},300);
            });
          }
        };
    });
    
    app.directive("blogPost",function(){
      return {
        restrict : 'E',
        replace : 'true',
        templateUrl : 'library/directives/blogPost/blogPost.html',
        link : function(scope,element){

        }
      };
    });

}(window, document, location, navigator, jQuery, angular, undefined));