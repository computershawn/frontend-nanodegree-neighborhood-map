/*

    Utility functions for rendering elements on a Google Map

    Udacity Frontend Web Dev Nano Project 5: Neighborhood Map
    Shawn Jackson <hello@shawnj.es>

 */

// Global variables for our Map and InfoWindow instances, and
// for the map bounding-box (determined by screen size)
var map, infoWin, bounds;


/*
Function initializeMap() is called after the app receives lat/lon
coordinates of EventBrite event locations
*/
function initializeMap(e) {
    if (typeof google !== 'undefined') {

        bounds = new google.maps.LatLngBounds();

        infoWin = new google.maps.InfoWindow({
            content: "",
            maxWidth: 240,
            maxHeight: 100,
            disableAutoPan: true
        });

        /* To display map, append googleMapDiv to #map-div.
        We do this in the above attachGoogleMap function */
        try {
            map = new google.maps.Map(document.getElementById('map'));
        } catch (e) {
            // If Maps fails for some reason, ask user to try re-loading
            googleOhNo(); // index.html
        }

        // No need to use plain-old vanilla styling
        map.setOptions({styles: mapStyles});

        // Show markers and center content when window gets resized
        google.maps.event.addDomListener(window, "resize", function () {
            google.maps.event.trigger(map, "resize");
            map.fitBounds(bounds);
        });

        // Fade in 'body' DOM element when everything is ready
        $("body").removeClass("invisible");

        // After body fade-in, post our location markers onto map
        initMapCenter(); // Center map to center of all event locations
        var t = window.setTimeout(postPins, 1000); // Place location pins on map
    }
}

// The 'evt' argument contains information about an upcoming
// EventBrite event. In this case, we're grabbing the event's
// latitude/longitude to create a marker on the Google map
function createMapMarker(evt, i) {
    var myLatLng = {
        lat: evt.eventLoc.lat,
        lng: evt.eventLoc.lon
    };
    
    // Use a timeout to stagger the animation of markers (pins)
    // dropping onto map
    var pinDropTO = window.setTimeout(function () {
        var m = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Marker ' + i,
            draggable: true,
            animation: google.maps.Animation.DROP,
            myIndex: i
        });   

        // Attach event handlers for when user clicks marker
        google.maps.event.addListener(m, 'click', function () {
            showInfo(m);
            getBouncy(m);
            // Wait a bit, then pan map to this marker
            var panDelay = window.setTimeout(pan, 400, m.position);
            if(panelIsOpen && window.innerWidth < 640) {
                var panelTO = window.setTimeout(togglePanel, 300);
            }
        });

        // Add this marker to global array 'markers' so we can
        // access it elsewhere in the application
        markers.push(m);
    }, i * 150);
}

// Pan our Google Map to a specific location
function pan(latLon) {
    map.panTo(latLon);
}

// Create one map marker 'pin' on the Google map for each
// item in array eventList
function postPins() {
    var counter = 0, ev;
    for (ev in eventList) {
        // Variable 'counter' makes sure each marker has
        // a unique index. Use this index to reference
        // the event's list-item in the Wine Events panel
        createMapMarker(eventList[ev], counter);
        counter++;
    }
}

function initMapCenter() {
    var evt;
    for (evt in eventList) {
        // Reset the bounds of our map, now that we added a marker
        bounds.extend(new google.maps.LatLng(eventList[evt].eventLoc.lat, eventList[evt].eventLoc.lon));

        // Fit the map to the new marker
        map.fitBounds(bounds);

        // Center the map
        map.setCenter(bounds.getCenter());
    }    
}

// When a marker is clicked, get its EventBrite event's
// info and pre-format it for display in Maps InfoWindow
function formatContent(ind) {
    var n = eventList[ind].eventName, d = eventList[ind].desc, u = eventList[ind].eventURL;
    var str = '<div id="info-window-content"><div id="siteNotice"></div>' +
          '<h3 id="firstHeading" class="firstHeading">' + n + '</h3>' +
          '<div id="bodyContent"><p>' + d + '</p>' +
          '<p><a class="btn btn-primary-outline" href="' + u + '" target="_blank" title="' + n +'" role="button">' +
          'View Event</a></p>' +
          '</div>' + '</div>';
    
    return str;
}

// Open the InfoWindow
function showInfo(mrkr) {
    // Set the InfoWindow content to the currently-selected
    // marker's corresponding Wine Event
    infoWin.setContent(formatContent(mrkr.myIndex));
    
    // Move the InfoWindow to the screen location of the
    // currently-selected marker, then open the InfoWindow
    infoWin.open(map, mrkr);
}

// Make the Google Maps marker bounce
function getBouncy(mrkr) {
    // Switch ON the Bounce animation for currently-selected marker    
    mrkr.setAnimation(google.maps.Animation.BOUNCE);
    
    // While we're at it, change the corresponding Wine Event's
    // background color in the panel
    wEVM.clickedItemIndex(mrkr.myIndex);  // kofun.js, index.html
    
    // But then, after about a second...
    mrkr.tO = window.setTimeout(function () {
        if (mrkr.getAnimation() !== null) {
            // Switch OFF bounce animation
            mrkr.setAnimation(null);
            // Revert background color
            wEVM.clickedItemIndex(-1);
        }
    }, 1200);
}

function fitmap(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(bounds);
}

