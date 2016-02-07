/*

    Utility functions for retrieving EventBrite events

    Udacity Frontend Web Dev Nano Project 5: Neighborhood Map
    Shawn Jackson <hello@shawnj.es>

 */
function getEventList() {
    $(document).ready(function() {
        // We'll use these variables to construct a query that we'll then send
        // asynchronously to EventBrite. In our application, we search specifically
        // for "wine" events in the food & drink category, within a 20 mile radius
        // of Los Angeles
        var baseURL = 'https://www.eventbriteapi.com/v3/events/search/';
        var topic = 'wine';
        var access = '&token=' + '4T2NFACNH7TIFJ6ZWN2E';
        var cat = '&categories=' + '110';
        var evLoc = '&location.address=' + 'Los Angeles, CA';
        var within = '&location.within=' + '20mi';
        // EventBrite API doesn't give address by default. The "&expand" directive
        // lets us request it so we don't have to make 2 API calls
        var venueExp = '&expand=' + 'venue.address';
        var $events = $("#events");
        var qURL = encodeURI(baseURL + '?q=' + topic + evLoc + within + venueExp + cat + access);

        var info = $.ajax({
            url: qURL,
            success: function(res) {
                if (res.events.length) {
                    for (var i = 0; i < res.events.length; i++) {
                        // Got some results. Now put them into our eventList array.
                        // The application will depend on the data inside it
                        eventList.push({
                            // The query returns lots of info about each event.
                            // Our array will just contain the info we need
                            "eventName": res.events[i].name.text,   // title
                            "desc": res.events[i].description.text, // description
                            "eventURL": res.events[i].url,  // link to this event's page
                            "eventDateTime": res.events[i].start.local,  // when the event starts
                            "eventLoc": {  // location of this event, lat/lon
                                "lat": res.events[i].venue.address.latitude,
                                "lon": res.events[i].venue.address.longitude
                            }
                        });
                        if (i == maxListings - 1) { // Limit the number of events we display
                            break;
                        }
                    }
                } else {
                    alert("Hmm... Looks like there are no wine events in your area\n:(");
                }
                // Now that we have data for EventBrite events, display the info
                // in a Knockout.js-based panel. Also, display our Google Map
                initializeMap(); // mapfun.js
                buildKoPanel(); // kofun.js
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Sorry, it looks like we weren't able to get events from EventBrite.\nPlease try re-loading this page after a few minutes.");
            }
        });

    });
}