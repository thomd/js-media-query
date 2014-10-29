# JavaScript Media Queries

Trigger JavaScript events on transition of media query breakpoints and keep your media queries in the CSS as the only place.

### Usage

    bower install jquery js-media-query

Add `onMediaMatch` event listener for a `marker-name` breakpoint using jquery's chaining-syntax. Provide a matching event-handler and an optional non-matching event-handler like this:

    <script type="text/javascript" src="components/jquery/jquery.js"></script>
    <script type="text/javascript" src="components/js-media-query/dist/mediaquery.js"></script>
    <script type="text/javascript">
      ...
      $('#header').onMediaMatch('marker-name', matchingEventHandler, nonMatchingEventHandler);
    </script>

Import `breakpoint.sass` in your sass file and define a `marker-name` breakpoint marker:

    @import 'breakpoint'
    #header
      @media screen and (min-width: 768px)
        @include js-breakpoint('marker-name')
        ...

### Demo

    grunt demo
    open http://localhost:8888

### Test

    npm install
    grunt test

