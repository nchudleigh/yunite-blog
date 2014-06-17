(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    var app = angular.module('app', [
        'ui.router'
      , 'ui.bootstrap'
      , 'ui.select2'
      , 'pascalprecht.translate'
      , 'angular-growl'
      , 'navigation'
      , 'postster'
      , 'home'
      , 'sharedData'
    ])
    
    .config(function($stateProvider, $sceProvider, $urlRouterProvider, $logProvider, $translateProvider, growlProvider) {
        
        $urlRouterProvider.otherwise('home');
        
        $sceProvider.enabled(true);
                
        $translateProvider.preferredLanguage('en');
        $logProvider.debugEnabled(false);
        growlProvider.globalTimeToLive(5000);
    
    });

    app.controller("blogController",['$scope','$rootScope','getBlogPosts',function($scope,$rootScope,getBlogPosts){

      $scope.resizeContent = function()
      {
        var currentWidth = window.innerWidth - $(".drawer").width();
        $(".content").width(currentWidth);
      }

      $scope.updatePosts = function(data){
        $rootScope.posts = eval(data);
        $rootScope.$emit('newPostsEvent');
        $scope.posts = $rootScope.posts;
      };

      // Window/content resizing
      angular.element(window).bind('resize',$scope.resizeContent);

      // Get blog post data
      getBlogPosts.success(function(data,status,headers,config){
        $scope.updatePosts(data);
      }).error(function(data,status,headers,config){
        console.log("Failure");
      });
    }]);

    app.controller("sideBarController",['$scope','$rootScope',function($scope,$rootScope){
      $rootScope.$on('newPostsEvent', function() {
        $scope.posts = $rootScope.posts;
      });


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
          element.children(".bpostTitle").html();
        }
      };
    });

    app.factory('getBlogPosts',['$http',function($http){
      return $http.get("/json/posts.json");
    }]);

    app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
    });

}(window, document, location, navigator, jQuery, angular, undefined));