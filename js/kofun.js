/*

    Utility functions for handling list, filter, and any other
    info on the page that may change state.

    Udacity Frontend Web Dev Nano Project 5: Neighborhood Map
    Shawn Jackson <shontek@gmail.com>

 */


// We'll use eventListLength for conditional CSS. When the
// fitered list contains no items, the wine event panel will
// show a list-item that says 'No events with that label'
var eventListLength = ko.observable(1);

ko.subscribable.fn.filter = function (search, property) {
    var filteredList;
    return ko.computed(function () {
        var searchValue = ko.unwrap(search).toLowerCase();
        var prop = ko.unwrap(property);
        filteredList = ko.utils.arrayFilter(this(), function (item) {
            var found;
            if (prop) {
                var itemProp = ko.unwrap(item[prop]).toString().toLowerCase();
                found = (itemProp.indexOf(searchValue) === 0);
            } else {
                found = (item.indexOf(searchValue) === 0);
            }
            toggleMarker(ko.unwrap(item["index"]), found);  // mapfun.js
            return found;
        });
        eventListLength(filteredList.length);
        return filteredList;
    }, this);
};

// Class to represent a wine event in the panel
function WineEvent(name, link, dateTime, index) {
    var self = this;
    self.name = ko.observable(name.replace(/"/g, ""));
    self.link = ko.observable(link);
    //self.eventStart = ko.observable(time);

    self.eventDay = moment(dateTime).format("ddd");
    self.eventDate = moment(dateTime).format("MMM DD");
    self.eventTime = moment(dateTime).format("hA");
    
    self.index = ko.observable(index);
    self.myID = ko.observable("item-" + index);
    
    self.showMarker = function () {
        getBouncy(markers[index]);  // mapfun.js
        showInfo(markers[index]);
    };
}

// Overall viewmodel for wine events pane
function WineEventsViewModel() {
    
    var self = this;
    var i;

    // Knockout array of wine event names, locations, times and descriptions
    self.wineEvents = ko.observableArray([]);
    for (i = 0; i < eventList.length; i++) {
        self.wineEvents.push(new WineEvent(eventList[i].eventName, eventList[i].eventURL, eventList[i].eventDateTime, i));
    }
    
    self.search = ko.observable("");
}


function buildKoPanel() {
    // Activates knockout.js
    ko.applyBindings(new WineEventsViewModel());
}


