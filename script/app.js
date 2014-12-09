
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
            //find the container element with className row
            base.parent = $(el).closest(".row");
            //get the test to be animated
            base.text =  base.parent.find("#inputText").val();
            //add a new div next to the parent container
            var canvas = $("<div class='canvas'></div>").insertAfter(base.parent);
            //set the text and call the lettering API
            $(canvas)
               .html(base.text)
               .lettering();
            //wrap all the individual characters into a temporary div
            $(canvas).find("span").wrapAll("<div class='src'></div>");
            //number of rows and columns
            var count=4;
            var offsetX=0;
            var offsetY=0;
            var whitespace = /\s/g;
            canvas.find("span").each(function(k,val){
            var width = $(val).width();
            var height = $(val).height();
            if(!whitespace.test($(val).text())){
            var rows = Math.floor(height*(1/count));
            var columns = Math.floor(width*(1/count));

                 
                for(var i=0;i<count;i++){
                   
                     for(var j=0;j<count;j++){
                          $(val)
                                .clone()
                                .appendTo(canvas)
                                .wrap('<div></div>')
                                .css({
                                        position: 'absolute',
                                        visibility: 'visible',
                                        left:-i*columns,
                                        top:-j*rows
                                })
                                .parent()
                                .addClass('explode')
                                .css({
                                        fontSize:  canvas.css("fontSize"),
                                        position: 'relative',
                                        overflow: 'hidden',
                                        width: columns,
                                        height:rows,
                                        left:offsetX,
                                        top: -offsetY
                                    });
                }
                  offsetX+=columns;
                  offsetY+=height;
            }
     
            
          }
          else
          {
             offsetX+=width;
          }

          
            })
           base.animate();
        };
        base.animate = function () {
              var maxX = window.innerWidth,
                  maxY = $(window).height();
              $('.canvas .explode').each(function (i, el) {
                  var scaleTween, subTl;
                  subTl = new TimelineLite({
                      delay: i * 0.1
                  });
                  subTl.from($(el), 1, {
                      css: {
                          alpha: 0,
                          x: Math.random() * maxX - (maxX / 2),
                          y: Math.random() * maxY - (maxY / 2)
                      },
                      ease: Power3.easeInOut
                  });
                
                  scaleTween = TweenMax.from($(el), 0.8, {
                      css: {
                          scale: Math.random() * 3,
                          rotation: Math.random() * 360 - 180
                      }
                  });
                  subTl.insert(scaleTween, 0.8);

              })


          };
        // Sample Function, Uncomment to use
        // base.functionName = function(paramaters){
        // 
        // };
        
        // Run initializer
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
  $.material.init();
  $("#animateText").click(function(){
      
            $(".canvas").remove();
           $(this).particleText();
  });
});