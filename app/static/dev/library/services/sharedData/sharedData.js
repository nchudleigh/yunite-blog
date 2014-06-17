(function(angular, undefined) {
    'use strict';
    
    angular.module('sharedData', [])
    
    .service('sharedDataService', function($timeout) {
        var data = {};
        
        return function(scope) {
            scope.sharedData = data;
        }
    })
    
;}(angular));