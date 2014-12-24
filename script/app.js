
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
            var scaler = 90;
            base.$el
               .empty()
               .html(base.$el.data('text'))
               .lettering();
            //wrap all the individual characters into a temporary div
             base.$el.find("span").wrapAll("<div class='src'></div>");
             base.$el.find(".src").css("fontSize",scaler+"px")
            //number of rows and columns
     
         
            var count=2;
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
           base.animate(count);

        };
       
    
       
        base.animate = function (count) {
              var maxX = window.innerWidth,
                  maxY = $(window).height();
                  base.$el.find('.letter').each(function (i, element) {
                    $(element).find('.explode').each(function (i, el) {
                  var subTl;
                  subTl = new TimelineMax({
                      delay: i/count ,
                      repeat : -1,
                      yoyo:true
                  });
                  subTl.from($(el),0.1, {
                      css: {
                          y:count
                      },
                  });
                
               

              });
                  });
                  

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


      
          
           $(".canvas").particleText();

});