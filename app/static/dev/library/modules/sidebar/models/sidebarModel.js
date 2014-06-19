(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('sidebar.model', [])

    .filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    })
    
;}(window, document, location, navigator, jQuery, angular, undefined));