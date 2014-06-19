(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('topbar.controller', [])

    .controller("topbarController",['$scope','$rootScope','$location',function($scope,$rootScope,$location){
      $rootScope.drawerHidden = true;

      $rootScope.$on("hideDrawer",function(){$rootScope.toggleDrawer(false);});
      $rootScope.$on("showDrawer",function(){$rootScope.toggleDrawer(true);});

      $scope.showDrawer = function()
      {
        $rootScope.$emit("showDrawer");
      }

      $scope.hideDrawer = function()
      {
        $rootScope.$emit("hideDrawer");
      }

      $rootScope.toggleDrawer = function(force)
      {
        if(force != undefined)
        {
          $rootScope.drawerHidden = force;
        }
        
        if($rootScope.drawerHidden == true)
        {
          $rootScope.drawerHidden = false;
          $(".drawer").removeClass("drawer_hidden");
          $(".drawer").addClass("drawer_show");
        }else{
          $rootScope.drawerHidden = true;
          $(".drawer").removeClass("drawer_show");
          $(".drawer").addClass("drawer_hidden");
        }
      };
    }]);
    
;}(window, document, location, navigator, jQuery, angular, undefined));