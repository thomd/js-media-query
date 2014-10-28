# JavaScript Media Queries

Trigger JavaScript events on transition of media query breakpoints and keep your media queries in the CSS as the only place.

## Example Usage

Import `breakpoint.sass` in your sass file and define a 'marker-name' breakpoint-marker if you need to access this media-query in client-side javascript:

    @import 'breakpoint'
    #header
      @media screen and (min-width: 768px)
        @include js-breakpoint('marker-name')
        ...

Add 'marker-name' onMediaMatch event listener in your javascript using jquery's chaining-syntax. Provide a matching event-handler and an optional non-matching event-handler like this:

    $('#header').onMediaMatch('marker-name', matchingEventHandler, nonMatchingEventHandler);

## Test

    npm install
    grunt test

