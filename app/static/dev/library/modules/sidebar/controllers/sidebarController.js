(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('sidebar.controller', [])

    .controller("sidebarController",['$scope','$rootScope','$routeParams',function($scope,$rootScope,$routeParams){
      
      $scope.routeId = $routeParams.id;
      $rootScope.routeId = $routeParams.id;

      $scope.pageTop = function(){
        $(".card").eq(0).trigger("click");
      };

      $rootScope.$on('newPostsEvent', function() {
        $scope.posts = $rootScope.posts;
        if($scope.routeId != undefined)
        {
        	console.log("Post id present in url: "+$scope.routeId);
        	// Make sure to do error checking
          setTimeout(function(){
            $(".card[card-id='"+$scope.routeId+"']").trigger("click");
            $scope.routeId = undefined;
          },100);
        }
      });
    }])
    
;}(window, document, location, navigator, jQuery, angular, undefined));

