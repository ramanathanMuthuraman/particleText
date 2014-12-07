
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
            //find the font size
         
         
            var count=3;
            var offsetX=0;
            var offsetY=0;
            var whitespace = /\s/g;
            $(el).find("span").each(function(k,val){
            var width = $(val).width();
            var height = $(val).height();
            if(!whitespace.test($(val).text())){
            var rows = Math.floor(height*(1/count));
            var columns = Math.floor(width*(1/count));

                 
                for(var i=0;i<count;i++){
                   
                     for(var j=0;j<count;j++){
                          $(val)
                                .clone()
                                .appendTo('.replica')
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
                                        fontSize: $(el).css("fontSize"),
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
            // Put your initialization code here
        };
        base.animate = function(){


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
$(".canvas").lettering().particleText();
});