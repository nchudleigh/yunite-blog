(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    var app = angular.module('manage', [
        'ui.router'
      , 'ui.bootstrap'
      , 'ui.select2'
      , 'pascalprecht.translate'
      , 'angular-growl'
      , 'sharedData'
    ])
    
    .config(function($stateProvider, $sceProvider, $urlRouterProvider, $logProvider, $translateProvider, growlProvider) {
        
        $urlRouterProvider.otherwise('home');
        
        $sceProvider.enabled(true);
                
        $translateProvider.preferredLanguage('en');
        $logProvider.debugEnabled(true);
        growlProvider.globalTimeToLive(5000);
    
    });

    app.controller('manageController', ['$http','$scope','createPost', function($http,$scope,createPost){
        $scope.createPost=function(){
            createPost($scope.post).success($scope.createSuccess).error($scope.createFailure);
        }

        $scope.createSuccess = function(data){
                console.log(data)
            };

            $scope.createFailure = function(data){
                console.log(data)
            };
    }])

    app.factory('createPost', ['$http', function($http){
        return function(post){
            return $http({
                method:'POST', 
                url:'manage/create_post',
                data: JSON.stringify(post),
                headers:{'Content-Type':'application/json'}
            })
        }; 
    }]);

}(window, document, location, navigator, jQuery, angular, undefined));
