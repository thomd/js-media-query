;(function(window, document, $){
  "use strict";

  $.fn.onMediaMatch = function(breakpoint, eventHandler){

    if(typeof breakpoint !== 'string' || typeof eventHandler !== 'function') {
      $.error('wrong arguments for onMediaMatch');
    }

    return this.each(function(){

      var value, matched = false;
      var el = (this.nodeType === 9) ? this.body : this;

      // Return a function that will be called after being idle for `delay` milliseconds.
      // This prevents from slow down page performance due to a possible long running callback `fn`.
      //
      // TODO move to $.fn.onMediaMatch.debounce
      //
      var debounce = function(fn, delay) {
        var timer = null;
        return function() {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function(){
            fn.apply(context, args);
          }, delay);
        };
      };

      var checkForMatch = function(){
        value = window.getComputedStyle(el, ':after').getPropertyValue('content');
        matched = value.replace(/\"/g, "") === breakpoint;
        console.log(value);
        if(matched) {
          eventHandler.call(el);
        }
      };

      if($.fn.onMediaMatch.hasGetComputedStyleSupport) {

        checkForMatch();
        //var debounceResize = debounce(checkForMatch, 50);
        var debounceResize = checkForMatch;
        $(window).on('resize', debounceResize);
        $(window).on('orientationchange', debounceResize);

      }
    });

  };

  $.fn.onMediaMatch.hasGetComputedStyleSupport = (function(){
    if (window.getComputedStyle) {
      var content = window.getComputedStyle(document.documentElement, ':after').getPropertyValue('content');
      if (content.replace(/\"/g, "") === 'test-getComputedStyle') return true;
    }
    return false;
  })();

})(window, document, jQuery);
