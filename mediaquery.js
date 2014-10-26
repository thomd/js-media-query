// consume CSS media-queries for elements without the need of defining them again (DRY)
//
// USAGE EXAMPLE
//
//	(1) include 'my-marker-name' breakpoint-marker in <module|component>.sass if you need to access this media-query in clientside javascript:
//
//		  #header
//			 @media screen and (min-width: $screen-sm-min)
//				@include js-breakpoint('my-marker-name')
//              ...
//
//	(2) add 'sm' onMediaMatch event listener in <module|component>.js using jquery's chaining-syntax. provide a maching event-handler and
//      an optional non-maching event-handler:
//
//		  $('#header').onMediaMatch('my-marker-name', matchingEventHandler, nonMatchingEventHandler);
//
;(function(window, document, $){
  'use strict';

  $.fn.onMediaMatch = function(breakpoint, matchingEventHandler, nonMatchingEventHandler) {

    if (typeof breakpoint !== 'string' || typeof matchingEventHandler !== 'function' || (nonMatchingEventHandler !== undefined && typeof nonMatchingEventHandler !== 'function')) {
      $.error('wrong arguments for onMediaMatch');
    }

    var nonMatchingEventHandler = nonMatchingEventHandler || function(){}

    return this.each(function() {

      var elem = (this.nodeType === 9) ? this.body : this;

      var checkForMatch = function() {
        if (window.getComputedStyle(elem, ':after').getPropertyValue('content').replace(/\"/g, '') === breakpoint) {
          matchingEventHandler.call(elem);
        } else {
          nonMatchingEventHandler.call(elem);
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
