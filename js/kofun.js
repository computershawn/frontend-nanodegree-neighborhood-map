/*

    Utility functions for handling list, filter, and any other
    info on the page that may change state.

    Udacity Frontend Web Dev Nano Project 5: Neighborhood Map
    Shawn Jackson <hello@shawnj.es>

 */


// We'll use eventListLength for conditional CSS. When the
// fitered list contains zero items, the Wine Events panel
// will remove CSS class 'no-show' from the last list-item,
// making it visible. (Display is set to 'none'. Removing
// the class sets display to 'block'). The list-item itself
// contains the text "No events labeled..." (see index.html).
// If the user types in the input text field and their string
// isn't found, the panel would just collapse and not really
// indicate anything. We add this "No events labeled..." list
// item to more gracefully handle a zero-content list 
var eventListLength = ko.observable(1);


// Our global instance of the Wine Events View Model. We make it
// global so that click events on Google Maps markers can affect
// CSS inside our Wine Events panel, built with Knockout
var wEVM;


// Class to represent a wine event in the panel
function WineEvent(name, link, dateTime, index) {
    var self = this;
    self.name = ko.observable(name);
    self.link = ko.observable(link);

    // Parse/format event date/time info with Moment.js
    self.eventDay = moment(dateTime).format("ddd");
    self.eventDate = moment(dateTime).format("MMM DD");
    self.eventTime = moment(dateTime).format("hA");
    
    self.index = ko.observable(index);
    self.myID = ko.observable("item-" + index); // Assign it a DOM id
    
    // Google Maps marker will react when its corresponding
    // Wine Event list item is clicked in the panel
    self.showMarker = function () {
        getBouncy(markers[index]);  // mapfun.js
        showInfo(markers[index]);
        var panelTO = window.setTimeout(togglePanel, 500);  // main.js
    };    
}

// Overall viewmodel for wine events panel
function WineEventsViewModel() {
    
    var self = this;
    var i;

    // Knockout array of wine event names, locations, times and descriptions
    self.wineEvents = ko.observableArray([]);
    for (i = 0; i < eventList.length; i++) {
        self.wineEvents.push(new WineEvent(eventList[i].eventName, eventList[i].eventURL, eventList[i].eventDateTime, i));
    }
    
    self.clickedItemIndex = ko.observable(-1);
    self.search = ko.observable("");
    
    // This is where the list filtering magic happens. A text input field in
    // the Wine Events panel lets the user type text to narrow down events
    // by their title. If they're specifically looking for a festival, for
    // example, they can type "festival". The Wine Events panel will update
    // in real-time to display only events that contain "festival" in their
    // title. So instead of driving the list of events with array wineEvents
    // (above), the app will drive the events list with textFilterResults.
    // This array is just a subset of wineEvents. This array gets refreshed
    // any time the user types in the text field
    self.textFilterResults = ko.pureComputed(function() {
        var all = self.wineEvents(), filteredList = [];
        // Observable "self.search" is bound to the text input field. String
        // "searchValue" is what the user types in
        var searchValue = ko.unwrap(self.search()).toLowerCase();
        for(var i = 0; i < all.length; i++) {   // Cycle through Wine Event titles
            var evt = all[i];
            var evtName = ko.unwrap(evt["name"]).toLowerCase();
            var found = (evtName.indexOf(searchValue) != -1);
            // Variable "found" will be "true" only if searchValue is a
            // substring of evtName. If evtName is "Pasadena Winefest 2016"
            // and user types "Winefest" as searchValue, found will be set
            // to true. If user types "Beerfest", found will be false :(
            if (found) {
                // If found, add this event to array "filteredList"
                filteredList.push(evt);
            }
            // Show map marker if event title is found. Otherwise, hide marker
            toggleMarker(ko.unwrap(evt["index"]), found);   // mapfun.js
        }
        // Update eventListLength after applying input text filter
        eventListLength(filteredList.length);
        return filteredList;
    }, self);
}


function buildKoPanel() {
    // Activates knockout.js. This can be done inline, but we assign the
    // new WineEventsViewModel to global variable wEVM so we can reference
    // it elsewhere in the application
    wEVM = new WineEventsViewModel();
    ko.applyBindings(wEVM);
}


