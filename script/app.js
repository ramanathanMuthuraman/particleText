
(function($){
    $.particleText = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("particleText", base);
        
        base.init = function(){
            base.options = $.extend({},$.particleText.defaultOptions, options);
            var scaler = 50;
            base.$el
               .empty()
               .html(base.$el.data('text'))
               .lettering();
            //wrap all the individual characters into a temporary div
             base.$el.find("span").wrapAll("<div class='src'></div>");
             base.$el.find(".src").css("fontSize",scaler+"px")
            //number of rows and columns
     
         
            var count=5;
            var offsetX=0;
            var offsetY=0;
            var whitespace = /\s/g;
            var container = base.$el.find(".src");
            var containerWidth = container.width();
            var containerHeight = container.height();
            base.$el.css("height",containerHeight);
            base.$el.css("width",containerWidth);
            base.$el.find("span").each(function(k,val){
            var width = $(val).width();
            var height = containerHeight;
            if(!whitespace.test($(val).text())){
          
               var rows = Math.ceil(height/count);
            var columns = Math.ceil(width/count);
                 var letter = $("<div class='letter'></div>").appendTo(base.$el); 
                 var color = "#"+Math.floor(Math.random()*16777215).toString(16);
                for(var i=0;i<count;i++){
                   
                     for(var j=0;j<count;j++){

                          $(val)
                                .clone()
                                .appendTo(letter)
                                .wrap('<div></div>')
                                .css({
                                        fontSize:  scaler+'px',
                                        position: 'absolute',
                                        visibility: 'visible',
                                        left:-(j*columns),
                                        top: -(i*rows)
                                })
                                .parent()
                                .addClass('explode')
                                .attr("data-left",(j*columns)+offsetX+"px")
                                .attr("data-top",(i*rows)+"px")
                                .css({
                                        
                                        position: 'absolute',
                                        color:color,
                                        overflow: 'hidden',
                                        width: columns,
                                        height:rows,
                                        left:(j*columns)+offsetX,
                                        top: (i*rows)
                                    });
                          
                                 
                }
                
                offsetY+=height/count;
            }
        
            //character offest
            offsetX+=width 
          }
          else
          {
            //space offset
             offsetX+=width;
          }

          
            })
           base.animate();
        };
        base.bind = function() {

          $(".letter").bind("mouseenter",base.split)
          .bind("mouseleave",base.join);

        };
        base.split = function(e)
        {
   var maxX = window.innerWidth,
                  maxY = $(window).height();
                  $(e.currentTarget).find(".explode").each(function (i, el) {
                       var subTl;
                  subTl = new TimelineLite({
                      delay: i * 0.01
                  });
                  subTl.to($(el), 1, {
                      css: {
                          alpha: 0,
                          x: Math.random() * maxX - (maxX / 2),
                          y: Math.random() * maxY - (maxY / 2)
                      },
                      ease: Power3.easeInOut
                  });
                
                });
        };
        base.join = function(e){

                  $(e.currentTarget).find(".explode").each(function (i, el) {
                       var subTl;
                  subTl = new TimelineLite({
                      delay: i * 0.01
                  });
                  subTl.to($(el), 1, {
                      css: {
                        alpha:1,
                          x: 0,
                          y: 0
                      },
                      ease: Power3.easeInOut
                  });
                
                });
        };
        base.animate = function () {
              var maxX = window.innerWidth,
                  maxY = $(window).height();
                  base.$el.find('.explode').each(function (i, el) {
                  var subTl;
                  subTl = new TimelineLite({
                      delay: i * 0.01
                  });
                  subTl.from($(el), 1, {
                      css: {
                          alpha: 0,
                          x: Math.random() * maxX - (maxX / 2),
                          y: Math.random() * maxY - (maxY / 2)
                      },
                      ease: Power3.easeInOut
                  });
                
               

              })
                  base.bind();

          };
     
        base.init();
    };
    
    $.particleText.defaultOptions = {
    };
    
    $.fn.particleText = function(options){
        return this.each(function(){
            (new $.particleText(this, options));
        });
    };
    
})(jQuery);
$(document).ready(function(){

//  $("#animateText").click(function(){
      
          
           $(".canvas").particleText();
 // });
});