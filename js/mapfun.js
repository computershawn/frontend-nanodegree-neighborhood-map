/*

    Utility functions for rendering elements on a Google Map

    Udacity Frontend Web Dev Nano Project 5: Neighborhood Map
    Shawn Jackson <shontek@gmail.com>

 */
/*
Generate the custom Google Map for the website.
*/
var map; // Globalize our Map
var bounds = new google.maps.LatLngBounds();
var locations = [];
var info; // Globalize our infoWindow

// Attach map elements to the DOM
function attachGoogleMap() {
    var googleMapDiv = '<div id="map"></div>';
    $("#map-div").append(googleMapDiv);
}


/*
Function initializeMap() is called when page is loaded.
*/
function initializeMap(e) {
    // Attach map divs to DOM before building the map
    attachGoogleMap();

    info = new google.maps.InfoWindow({
        content: "",
        maxWidth: 240,
        maxHeight: 100
    });
    
    var mapOptions = {
        //disableDefaultUI: true,
        //zoom: 1
    };

    /* To display map, append googleMapDiv to #map-div.
    We do this in the above attachGoogleMap function */
    try {
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
    } catch(e) {
        // If Maps fails for some reason, ask user to try re-loading
        alert("Sorry, it looks like we weren't able to load your map.\nPlease try re-loading this page after a few minutes.");
    }
    map.setOptions({styles: mapStyles});

    google.maps.event.addDomListener(window, "resize", function() {
        google.maps.event.trigger(map, "resize");
        map.fitBounds(bounds);
    });

    function createMapMarker(evt, i) {
        var myLatLng = {
            lat: evt.eventLoc.lat,
            lng: evt.eventLoc.lon
        };

        //window.setTimeout(function() {
        var m = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Marker ' + i,
            draggable: true,
            animation: google.maps.Animation.DROP,
            myIndex: i
        });   
        
        google.maps.event.addListener(m, 'click', function() {
            showInfo(m);
            getBouncy(m);
        });

        markers.push(m);

        bounds.extend(new google.maps.LatLng(evt.eventLoc.lat, evt.eventLoc.lon));
        // fit the map to the new marker
        map.fitBounds(bounds);
        // center the map
        map.setCenter(bounds.getCenter());
    }

    function postPins() {
        var counter = 0;
        for (var ev in eventList) {
            createMapMarker(eventList[ev], counter);
            counter++;
        }
    }

    postPins();

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();
}

// When a marker is clicked, get its EventBrite event's
// info and pre-format it for display in Maps InfoWindow
function formatContent(ind) {
    var n = eventList[ind].eventName;
    var d = eventList[ind].desc;
    var u = eventList[ind].eventURL;
    var str = '<div id="info-window-content"><div id="siteNotice"></div>' +
          '<h3 id="firstHeading" class="firstHeading">' + n + '</h3>' +
          '<div id="bodyContent"><p>' + d + '</p>' +
          '<p><a class="btn btn-primary-outline" href="' + u + '" target="_blank" title="' + n +'" role="button">' +
          'View Event</a></p>' +
          '</div>' + '</div>';
    
    return str;
}

// Show or hide markers depending on KnockoutJS
// text filter in event info pane
function toggleMarker(i, showHide) {
    // Our knockout script loads before the map. Before toggling
    // markers on/off, have to make sure they exist on the map
    if(markers[i]) {        
        if(showHide) {
            markers[i].setMap(map);
        } else {
            markers[i].setMap(null);
        }
    }
}

function showInfo(mrkr) {
    info.setContent(formatContent(mrkr.myIndex));
    info.open(map, mrkr);
}

function getBouncy(mrkr) {
    mrkr.setAnimation(google.maps.Animation.BOUNCE);
    item = '#item-' + mrkr.myIndex;
    $(item).addClass('hi-lite');

    mrkr.tO = window.setTimeout(function() {
        if (mrkr.getAnimation() !== null) {
            mrkr.setAnimation(null);
            $('.list-group-item').removeClass('hi-lite');
        }
    }, 1200);
}

function fitmap(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(bounds);
};

