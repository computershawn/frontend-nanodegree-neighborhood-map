## Neighborhood Map Project
*Wine All the Time* is a simple web app that shows upcoming wine-related events in the Los Angeles area. (It would be possible to expand the app to include areas other than Los Angeles). The app works by querying the EventBrite API for events, specifiying a topic (wine!) and a location (Los Angeles). JSON data returned from the API is plugged into a Knockout.js framework to build a Wine Events UI panel. The event locations are displayed on a Google map.

#### How to Use *Wine All the Time*
On your phone or desktop browser, visit the web app: [lab.shawnj.es/eventmap](http://lab.shawnj.es/eventmap). You'll see a Google Map with several markers. The markers indicate locations of some upcoming wine-related events in Los Angeles. A Wine Events panel on the left has some basic information about each event. Click/tap an event, or on a marker, to read the event description.

The Wine Events panel will fold away whenever you click an event listing or corresponding map marker. Click/tap the arrow button at the top of the Wine Events panel to manually open and close it.

Use the filter text field at the top of the wine events panel to narrow down events based on their titles. If no events match the text you type, the list will display 'No events labeled [your text]'. Go Forth! And Drink Wine!

#### About The Code
Main.js is the controller script, where we declare global variables and initizlize the application. To keep things organized, the app's core functionality was divided into 4 additional scripts:
* Ebfun.js - Utility functions for retrieving events from EventBrite API
* Kofun.js  - Utility functions for handling list, filter, and any other info on the page that may change state.
* Mapfun.js - Utility functions for rendering elements on a Google Map
* GoogleMapStyles.js - Array of styles for a Google Map, borrowed from the awesome [Snazzymaps](http://snazzymaps.com/).

The Google Map and the Wine Events panel were styled using [Bootstrap](http://getbootstrap.com/) and [Google Fonts](https://www.google.com/fonts), and icons from [FontAwesome](https://fortawesome.github.io/Font-Awesome/). [Moment.js](http:momentjs.com) provides some really useful functions for formatting dates received from the EventBrite API.