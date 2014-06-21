(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    angular.module('directive.sharebuttons', [])
    .directive("shareButtons",["$location","$timeout",function($location,$timeout){
          return {
            restrict : 'E',
            replace : true,
            templateUrl : 'library/directives/shareButtons/shareButtons.html',
            link : function(scope,element){
              var updateLinks = function(){
                // Build url from abs and this post's id
                var url = ($location.absUrl().replace(/post\/.*/g,"") + "post/" + element.attr("post-id"));

                // Generate each share link
                var links = {
                  facebook : "https://www.facebook.com/sharer/sharer.php?p[url]="+encodeURIComponent(url),
                  twitter : "https://twitter.com/share?url="+url,
                  hyperlink : url,
                  linkedin : "http://www.linkedin.com/shareArticle?mini=true&url="+url
                };
                console.log(links);
              };
              $timeout(updateLinks,100);
            }
          }
    }]);

;}(window, document, location, navigator, jQuery, angular, undefined));