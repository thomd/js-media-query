// USAGE EXAMPLE
//
//	(1) include a 'marker-name' breakpoint-marker in your sass if you need to access this media-query in clientside javascript:
//
//      @import 'breakpoint'
//      #header
//          @media screen and (min-width: 768px)
//              @include js-breakpoint('marker-name')
//              ...
//
//	(2) add 'marker-name' onMediaMatch event listener in your javascript using jquery's chaining-syntax.
//	    provide a matching event-handler and an optional non-matching event-handler like this:
//
//		  $('#header').onMediaMatch('marker-name', matchingEventHandler, nonMatchingEventHandler);

;(function(window, document, $){
  'use strict';

  $.fn.onMediaMatch = function(breakpoint, matchingEventHandler, nonMatchingEventHandler) {

    if (typeof breakpoint !== 'string' || typeof matchingEventHandler !== 'function' || (nonMatchingEventHandler !== undefined && typeof nonMatchingEventHandler !== 'function')) {
      $.error('wrong arguments for onMediaMatch');
    }

    return this.each(function() {

      var elem = (this.nodeType === 9) ? this.body : this;

      var checkForMatch = function() {
        if (window.getComputedStyle(elem, ':after').getPropertyValue('content').replace(/\"/g, '') === breakpoint) {
          matchingEventHandler.call(elem, breakpoint);
        } else {
          (nonMatchingEventHandler || $.noop).call(elem, breakpoint);
        }
      };

      checkForMatch();

      // use debounce pattern to improve performance (callback will be called when returned function is idle for `delay` ms)
      var debounceCheckForMatch = function(callback, delay) {
        var timer = null;
        return function() {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function() {
            callback.apply(context, args);
          }, delay);
        };
      }(checkForMatch, 50);

      $(window).on('resize', debounceCheckForMatch);
      $(window).on('orientationchange', debounceCheckForMatch);
    });

  };
})(window, document, jQuery);
