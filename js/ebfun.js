/*

    Utility functions for retrieving EventBrite events

    Udacity Frontend Web Dev Nano Project 5: Neighborhood Map
    Shawn Jackson <shontek@gmail.com>

 */


function getEventList() {
    $(document).ready(function() {
        var baseURL = 'https://www.eventbriteapi.com/v3/events/search/';
        var topic = 'wine';
        var access = '&token=' + '4T2NFACNH7TIFJ6ZWN2E';
        var cat = '&categories=' + '110';
        var evLoc = '&location.address=' + 'Los Angeles, CA';
        var within = '&location.within=' + '20mi';
        var venueExp = '&expand=' + 'venue.address';
        var $events = $("#events");
        var qURL = encodeURI(baseURL + '?q=' + topic + evLoc + within + venueExp + cat + access);
        //console.log(qURL);

    var info = $.ajax({
        url:qURL,
        success:function(res) {
            if(res.events.length) {
                for(var i=0;i<res.events.length;i++) {
                    var event = res.events[i];
                    //console.log(event.start.local);
                    eventList.push({"eventName": event.name.text,
                                    "desc": event.description.text,
                                    "eventURL": event.url,
                                    //"eventTime": moment(event.start.local).format("ddd, MMM DD | hA"),
                                    "eventDateTime": event.start.local,
                                    "eventLoc": {
                                        "lat": event.venue.address.latitude,
                                        "lon": event.venue.address.longitude
                                    }
                                   });
                    if(i == maxListings-1) { break; }
                }
            } else {
                alert("No Wine Events In Your Area\n:(");
            }
            // Now that we have data for EventBrite events, display the info
            // in a KnockoutJS-based panel. Also, display our Google Map
            buildKoPanel();     // kofun.js
            initializeMap();    // mapfun.js
        },
        fail:function(){alert("Sorry, it looks like we weren't able to get events from EventBrite.\nPlease try re-loading this page after a few minutes.");}
      });
        
    });
}
