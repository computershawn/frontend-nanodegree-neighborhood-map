## Neighborhood Map Project
*Wine All the Time* is a simple web app that shows upcoming wine-related events in the Los Angeles area. (It would be easily expandable to include areas other than Los Angeles.) The app works by querying the EventBrite API for events, specifiying a topic (wine!) and a location (Los Angeles). JSON data returned from the API is plugged into a Knockout.js framework to build a Wine Events UI panel. The event locations are displayed on a Google map.

#### Run the Application Locally
Mac Localhost: Download *Wine All The Time* from its [Github repo](https://github.com/computershawn/frontend-nanodegree-neighborhood-map) to your 'Sites' folder. In your desktop browser, navigate to the web app: http://localhost/~{your short user name}/frontend-nanodegree-neighborhood-map

Alternatively, after downloading the app, you could open index.html with Adobe's Brackets text editor (free!). Then, while in Brackets, click File > Live Preview to view the application in your default browser.

#### How to Use *Wine All the Time*
You'll see a Google Map with several markers. The markers indicate locations of some upcoming wine-related events in Los Angeles. A Wine Events panel on the left has some basic information about each event. Click/tap an event, or on a marker, to read the event description.

If the device screen is less than 640 pixels wide, the Wine Events panel will be closed by default. Click/tap the panel toggle at the top/left of the screen to manually open and close the panel.

Use the filter text field at the top of the wine events panel to narrow down events based on their titles. If no events match the text you type, the list will display 'No events labeled [your text]'. Now, go forth! And Drink Wine!

#### About The Code
Main.js is the controller script, where we declare global variables and initizlize the application. To keep things organized, the app's core functionality was divided into 4 additional scripts:
* Ebfun.js – Utility functions for retrieving events (as JSON) from EventBrite API
* Kofun.js  – Utility functions for handling list, filter, and any other info on the page that may change state.
* Mapfun.js – Utility functions for rendering elements on a Google Map
* GoogleMapStyles.js – Array of styles for a Google map, borrowed from the awesome [Snazzy Maps](http://snazzymaps.com/).
##### External Resources
The Google Map and the Wine Events panel were styled using [Bootstrap](http://getbootstrap.com/) and [Google Fonts](https://www.google.com/fonts), and icons from [FontAwesome](https://fortawesome.github.io/Font-Awesome/). [Moment.js](http:momentjs.com) provides some really useful functions for formatting dates received from the EventBrite API.