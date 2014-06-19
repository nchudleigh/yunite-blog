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
    });

;}(window, document, location, navigator, jQuery, angular, undefined));