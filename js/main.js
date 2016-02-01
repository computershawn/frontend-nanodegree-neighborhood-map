/*

    Main controller script for general JS, Google Maps API and
    KnockoutJS functionality

    Udacity Frontend Web Dev Nano Project 5: Neighborhood Map
    Shawn Jackson <shontek@gmail.com>

 */




/*
Collect screen clicks into an array for use with Google Maps
*/
//var clickLocations = [];

/*
This array contains data about EventBrite events. We make this
a global variable so our Google Maps script can access it
*/
var eventList = [];

// EventBrite may return lots of events. Just show 8.
var maxListings = 8;
var markers = [];//new Array(maxListings);//[];

function logClicks(x,y) {
      clickLocations.push(
        {
          x: x,
          y: y
        }
      );
  console.log('x location: ' + x + '; y location: ' + y);
}

// Handle cases where screen width is narrow. We'll hide
// the event info panel when this happens
$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('#panel-row').toggleClass('active');
    $('#show-hide-btn-cont').toggleClass('inactive');
  });
});

// Function getEventsList is in ebfun.js. After this function
// runs, our array eventList will contain event names and
// locations. At this point, from ebfun.js, we call buildKoPanel
// (from kofun.js) to display the list of events. From ebfun.js,
// we also call initializeMap (from mapfun.js) to display the
// event locations on our Google map
$(window).load(getEventList);

