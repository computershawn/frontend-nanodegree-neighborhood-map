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

// Function to open and close the Wine Events panel
function togglePanel() {
    $('#events-panel-widget').toggleClass('active');
    $('#show-hide-panel').toggleClass('inactive');
    panelIsOpen = !panelIsOpen;
}

// Check the window width when first opening the app. If window
// is less than 640 pixels wide, collapse the Wine Events panel
$(window).ready(function() {
    if(panelIsOpen && window.innerWidth < 640) {
        var panelTO = window.setTimeout(togglePanel, 300);
    }
});

// If Wine Events panel is closed and user's screen width changes
// from less than to more than 640 pixels, the closed panel and
// its toggle-open button will be off canvas. Not good. Fix this
// by automatically toggling the Wine Events panel open when user
// resizes window from less than to more than 640 pixels wide
$(window).resize(function() {
    if(!panelIsOpen&&window.innerWidth >= 640){
        togglePanel();
    }
});