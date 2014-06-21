(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    var app = angular.module('manage', [
        'ui.router'
      , 'ui.bootstrap'
      , 'ui.select2'
      , 'pascalprecht.translate'
      , 'angular-growl'
      , 'sharedData'
      , 'textAngular'
    ])
    
    .config(function($stateProvider, $sceProvider, $urlRouterProvider, $logProvider, $translateProvider, growlProvider) {
        
        $urlRouterProvider.otherwise('home');
        
        $sceProvider.enabled(true);
                
        $translateProvider.preferredLanguage('en');
        $logProvider.debugEnabled(true);
        growlProvider.globalTimeToLive(5000);
    
    });

    app.controller('manageController', ['$http','$scope','createPost','logout',"getAuthor", function($http,$scope,createPost,logout,getAuthor){
        $scope.activePanel = 'add';
        $scope.editUser = {};
        $scope.dateNow = Date.now();

        $scope.createPost=function(){
            createPost($scope.post).success($scope.createSuccess).error($scope.createFailure);
        };

        $scope.createSuccess = function(data){
                document.location = '/';
            };

        $scope.createFailure = function(data){
                console.log(data);
            };

        $scope.logout=function(){
                logout().success($scope.logoutSuccess).error($scope.logoutFailure);
            };

        $scope.logoutSuccess = function(){
                document.location = '/';
            };

        $scope.logoutFailure = function(){
                console.log(data);
            };

        $scope.editUser.send = function(){
            return 1;
        };

        getAuthor().success(function(data){
            $scope.author = JSON.parse(data.result.data);
            $scope.editUser = JSON.parse(data.result.data);  
        }); 
    }]);

    app.controller("editDeleteController",["$scope","getMyPosts","deletePost","editPost","getAuthor",function($scope,getMyPosts,deletePost,editPost){

        $scope.getPosts = function()
        {
            getMyPosts().success(function(d){
                $scope.myPosts = JSON.parse(d.result.data);
                console.log($scope.myPosts);
            }).error();
        }

        $scope.deletePost = function(post_id){
            if(confirm("Are you sure you want to delete this post?"))
            {
                deletePost(post_id).success($scope.getPosts); 
            }
        }

        $scope.editPost=function(post_id){
            editPost(post_id).success($scope.getPosts);
        }

    }]);

    app.factory('getMyPosts', ['$http', function($http){
        return function(){
            return $http({
                method:'GET', 
                url:'/manage/my_posts',
                headers:{'Content-Type':'application/json'}
            })
        }; 
    }]);

    app.factory('deletePost', ['$http', function($http){
        return function(idi){
            return $http({
                method:'POST', 
                url:'/manage/delete_post/'+idi,
                headers:{'Content-Type':'application/json'}
            })
        }; 

    }]);app.factory('editPost', ['$http', function($http){
        return function(post){
            return $http({
                method:'POST', 
                url:'/manage/edit_post/'+post.id,
                data:post,
                headers:{'Content-Type':'application/json'}
            })
        }; 
    }]);

    app.factory('getAuthor', ['$http', function($http){
        return function(){
            return $http({
                method:'POST', 
                url:'/manage/me',
                headers:{'Content-Type':'application/json'}
            })
        }; 
    }]);

    app.factory('createPost', ['$http', function($http){
        return function(post){
            return $http({
                method:'POST', 
                url:'/manage/create_post',
                data: JSON.stringify(post),
                headers:{'Content-Type':'application/json'}
            })
        }; 
    }]);


    app.factory('logout', ['$http', function($http){
        return function(){
            return $http({
                method:'GET', 
                url:'/manage/logout'
            })
        };
    }]);

    app.filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });

}(window, document, location, navigator, jQuery, angular, undefined));
