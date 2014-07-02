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
                  facebook : url,
                  twitter : "https://twitter.com/share?via=YuniteNow&size=200&url="+url,
                  hyperlink : url,
                  linkedin : url
                };
                element.children(".urlContainer").val(links.hyperlink);
                element.children(".fb-share-button").attr("data-href",links.facebook);
                element.children(".twitter-share-button").attr("href",links.twitter);
                element.children(".linkedin-share-button").attr("data-url",links.linkedin);
              };
              $timeout(updateLinks,300);

              element.children(".showUrlContainer").bind("click",function(){
                if(element.children(".urlContainer").hasClass("urlContainer_show"))
                {
                  element.children(".urlContainer").removeClass("urlContainer_show")
                }else{
                  element.children(".urlContainer").addClass("urlContainer_show")
                }
                  element.children(".urlContainer").select();
              });
            }
          }
    }]);

;}(window, document, location, navigator, jQuery, angular, undefined));