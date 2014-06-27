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

          $("#page_top").css("width",$(".drawer").width()-21+"px");
          $scope.activePost();
        }else{
          $(".content").css("width","100%");

          $("#page_top").css("width",$(".drawer").width()-5+"px");
        }

        angular.element("iframe").height(angular.element("iframe").eq(0).width()*0.6);
      }

      $scope.updatePosts = function(data){
        $rootScope.posts = JSON.parse(data.result.data);
        $rootScope.$emit('newPostsEvent');
        $scope.posts = $rootScope.posts;
        setTimeout(function(){angular.element("iframe").height(angular.element("iframe").eq(0).width()*0.65);},300);
        setTimeout(function(){
          $scope.activePost();
        },300);
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

      angular.element(".content").bind("click",function(){
        if(angular.element(".drawer").hasClass("drawer_show"))
        {
          $scope.toggleDrawer();
        }
      });

      angular.element(".top_bar").bind("touchmove",function(e){
        e.preventDefault();
      });

      // Get blog post data
      getBlogPosts.success(function(data,status,headers,config){
        $scope.updatePosts(data);
      }).error(function(data,status,headers,config){
        console.log("Failure: Could not get posts");
      });

    }]);
    
;}(window, document, location, navigator, jQuery, angular, undefined));