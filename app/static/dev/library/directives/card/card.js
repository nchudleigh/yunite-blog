(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    angular.module('directive.card', [])
    .directive("card",function(){
        var aTime = 300; 
        return {
          restrict : 'E',
          replace : 'true',
          templateUrl : 'library/directives/card/card.html',
          link : function(scope, element)
          {
            element.bind('click',function(){

              $(".card").removeClass("currentCard");
              element.addClass("currentCard");
              $(".drawer").clearQueue().animate({
                scrollTop: ""+(element.offset().top - element.parent().offset().top - element.parent().scrollTop()- $(".drawer").height()/2+ element.height()/2)+"px"
              },aTime);

              // Scroll to selected post
              var currentPost = $(".bpost[post_id='"+element.attr("card-id")+"']")
              $(".content").clearQueue().animate({scrollTop : (currentPost.offset().top - currentPost.parent().offset().top - currentPost.parent().scrollTop())},{
                duration : aTime*3
              , start: function(){$(".content").css("opacity","0.25");}
              });

              setTimeout(function(){$(".content").css("opacity","1.0");},aTime*3-100);
            });

            element.bind('activate',function(){
              $(".card").removeClass("currentCard");
              element.addClass("currentCard");
              $(".drawer").clearQueue().clearQueue().animate({scrollTop: ""+(element.offset().top - element.parent().offset().top - element.parent().scrollTop()- $(".drawer").height()/2+ element.height()/2)+"px"},aTime);
              
            });
          }
        };
    });

;}(window, document, location, navigator, jQuery, angular, undefined));
