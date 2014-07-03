(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    angular.module('directive.sharebuttons', [])
    .directive("shareButtons",["$location","$timeout",function($location,$timeout){
          return {
            restrict : 'E',
            replace : true,
            templateUrl : 'library/directives/shareButtons/shareButtons.html',
            link : function(scope,element){
              var updateLinks = function()
              {
                // Build url from abs and this post's id
                var url = ($location.absUrl().replace(/post\/.*/g,"") + "post/" + element.attr("post-id"));
                
                var element2 = element.children(".social_buttons");

                element.find(".facebook-like").attr("data-href",url);
                element.find(".linkedin-share").attr("data-url",url);
                element.find(".googleplus-share").attr("data-url",url);
                element.find(".twitter-share").attr("data-url",url);

                $timeout(function(){Socialite.load(element);},500);
              }
              $timeout(updateLinks,500);

              element.find(".showShare").click(function(){
                $(this).remove();
                element.find(".social-buttons").css("display","block");
              });
            }
          }
    }]);

;}(window, document, location, navigator, jQuery, angular, undefined));