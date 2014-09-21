;(function(window, document, $, undefined){
  "use strict";

  $.fn.onMediaMatch = function(breakpoint, eventHandler){

    if(typeof breakpoint !== 'string' || typeof eventHandler !== 'function') {
      $.error('wrong arguments for onMediaMatch');
    }

    return this.each(function(){

      var value, matched = false;
      var el = (this.nodeType === 9) ? this.body : this;

      var debounce = function (func, wait) {
        var timeout, result;
        return function() {

          var context = this, args = arguments;
          var later = function() {
            timeout = null;
            result = func.apply(context, args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          return result;
        };
      };

      var checkForMatch = function(){
        value = window.getComputedStyle(el, ':after').getPropertyValue('content');
        matched = value.replace(/\"/g, "") === breakpoint;
        //console.log(breakpoint, value);
        if(matched) {
          eventHandler.call(this);
        }
      };

      if($.onMediaMatch.hasGetComputedStyleSupport) {

        checkForMatch();
        var debounceResize = debounce(checkForMatch, 50);
        $(window).on('resize', debounceResize);
        $(window).on('orientationchange', debounceResize);

      }
    });

  };

  $.onMediaMatch.hasGetComputedStyleSupport = (function(){
    if (window.getComputedStyle) {
      var content = window.getComputedStyle(document.documentElement, ':after').getPropertyValue('content');
      if (content.replace(/\"/g, "") === 'test-getComputedStyle') return true;
    }
    return false;
  })();

})(window, document, jQuery);
