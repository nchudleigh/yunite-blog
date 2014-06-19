(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('blogposts.model', [])

	.factory('getBlogPosts',['$http',function($http){
			console.log("Request to db");
	        return $http.get("/api/posts/all");
	}]);
;}(window, document, location, navigator, jQuery, angular, undefined));
