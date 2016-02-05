/*

    Main controller script for general JS, Google Maps API and
    KnockoutJS functionality

    Udacity Frontend Web Dev Nano Project 5: Neighborhood Map
    Shawn Jackson <hello@shawnj.es>

 */


/*
This array contains data about EventBrite events. We make this
a global variable so our Google Maps script can access it
*/
var eventList = [];

/*
Array 'markers' should have global scope so other functions can
// access it. Markers will contain our Google Maps Marker objects
*/
var markers = [];

// EventBrite may return lots of events. Just show 8.
var maxListings = 8;

// Keep track of whether Wine Events panel is open
var panelIsOpen = true;

// Handle cases where screen width is narrow. We'll hide
// the event info panel when this happens
$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(togglePanel);
});

function togglePanel() {
    $('#panel-row').toggleClass('active');
    $('#show-hide-btn-cont').toggleClass('inactive');
    panelIsOpen = !panelIsOpen;
}

// Function getEventsList is in ebfun.js. After this function
// runs, our array eventList will contain event names and
// locations. At this point, from ebfun.js, we call buildKoPanel
// (from kofun.js) to display the list of events. From ebfun.js,
// we also call initializeMap (from mapfun.js) to display the
// event locations on our Google map
$(window).load(function() {
    // Query EventBrite API. First, though, make sure Google Maps is present
    if (typeof google !== 'undefined') {
        getEventList(); // ebfun.js
    }
});

