(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    angular.module('directive.blogpost', [])
    .directive("blogPost",function(){
      return {
        restrict : 'E',
        replace : 'true',
        templateUrl : 'library/directives/blogPost/blogPost.html',
        link : function(scope,element){
          element.children(".bpostTitle").html();
        }
      };
  })

  .filter("resizeTitle",function(){
    return function(title){
      //desktop
      if(title.length >= 49 && window.innerWidth >= 700)
      {
        title = "<span style='font-size:14pt !important'>"+title+"</span>";
      }

      if(title.length >= 21 && window.innerWidth < 700)
      {
        title = "<span style='font-size:11pt !important'>"+title+"</span>";
      }
      return title;
    };
  });

;}(window, document, location, navigator, jQuery, angular, undefined));