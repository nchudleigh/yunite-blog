(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('blogposts.controller', [])

    .controller("blogController",['$scope','$rootScope','getBlogPosts',function($scope,$rootScope,getBlogPosts){
      $rootScope.mobileTransition = 700;

      $scope.resizeContent = function()
      {
        if(window.innerWidth > $rootScope.mobileTransition)
        {
          var currentWidth = window.innerWidth - $(".drawer").width();
          $(".content").width(currentWidth);
          $scope.activePost();
        }else{
          $(".content").css("width","100%");
        }
      }

      $scope.updatePosts = function(data){
        $rootScope.result = eval(data);
        //$rootScope.posts = $rootScope.result.
        $rootScope.posts = eval($rootScope.result.result.data);
        console.log($rootScope.posts);
        $rootScope.$emit('newPostsEvent');
        $scope.posts = $rootScope.posts;
        setTimeout(function(){$scope.activePost();},1000);
      };

      $scope.activePost = function()
      {
        // Find id of active post
        var pTop = 0;
        for(var i=0; i < $(".content_scroller").children().length ; i++)
        {
          pTop = $(".content_scroller").children().eq(i).position().top + $(".content_scroller").children().eq(i).height();
          if(pTop >= 0){
            $(".card[card-id='"+$(".content_scroller").children().eq(i).attr("post_id")+"']").trigger("activate");
            break;
          }
        }
      }

      // Window/content resizing
      angular.element(window).bind('resize',$scope.resizeContent);

      // content Scrolling
      angular.element(".content").bind('scroll',function(){
        if(window.innerWidth < $rootScope.mobileTransition)
        {
          clearTimeout($scope.activePostTimeout);
          $scope.activePostTimeout = setTimeout($scope.activePost,200)
        }else{
          $scope.activePost();
        }
      });


      // Get blog post data
      getBlogPosts.success(function(data,status,headers,config){
        $scope.updatePosts(data);
      }).error(function(data,status,headers,config){
        console.log("Failure: Could not get posts");
      });

    }]);
    
;}(window, document, location, navigator, jQuery, angular, undefined));