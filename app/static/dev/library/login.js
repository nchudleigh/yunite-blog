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

    app.controller('loginController', ["$http","$scope","loginValidate",function($http,$scope,loginValidate){
        $scope.checkForm=function(){
            loginValidate($scope.user).success($scope.loginSuccess).error($scope.loginFailure);
        };

        $scope.loginSuccess = function(data){
                document.location='/manage'
            };

            $scope.loginFailure = function(data){
                console.log(data)
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
