(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    var app = angular.module('login', [
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

    app.controller('loginController', ["$http","$scope","loginValidate","createUser","$timeout",function($http,$scope,loginValidate,createUser,$timeout){
        
        $scope.checkForm=function(){
            loginValidate($scope.user).success($scope.loginSuccess).error($scope.loginFailure);
        };

        $scope.loginSuccess = function(data){
            $scope.goodLogin = true;
            $timeout(function(){document.location='/manage';},800);
        };

        $scope.loginFailure = function(data){
            $scope.badLogin = true;
            $timeout(function(){$scope.badLogin = false;},1000);
        };

        $scope.createUser=function(){
            createUser($scope.user).success($scope.createSuccess).error($scope.createFailure);
        };

        $scope.createSuccess = function(data){
            document.location='/manage'
        };

        $scope.createFailure = function(data){
            console.log(data);
        };


    }]);

    app.factory('createUser', ['$http', function($http){
        return function(user){
            return $http({
                method:'POST',
                url:'manage/register',
                data: JSON.stringify(user),
                headers:{'Content-Type':'application/json'}
            })
        };
    }]);


    app.factory('loginValidate', ['$http',function($http){
        return function(user){
            return $http({
                method:'POST', 
                url:'manage/login',
                data: JSON.stringify(user),
                headers:{'Content-Type':'application/json'}
            })
        };
    }]);
    
}(window, document, location, navigator, jQuery, angular, undefined));
