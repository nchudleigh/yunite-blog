(function(angular, undefined) {
    'use strict';
    
    angular.module('scratchd.sharedData', [])
    
    .service('sharedDataService', function($timeout) {
        var data = {};
        
        return function(scope) {
            scope.sharedData = data;
        }
    })
    
;}(angular));