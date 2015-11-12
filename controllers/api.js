'use strict';

var events = require('../models/events');

/**
 * Controller that renders the API splash page
 */
function viewApi(request, response) {
  response.json({ message: 'API Landing Page' });  
}

/**
 * Controller that renders a list of events in JSON.
 * Controller also handles searching for list of events using query string.
 */
function listEventsJSON(request, response) {
  var search = request.query.search;
  var allEvents = events.all
  
  if (search == null) {
    response.json({ events: allEvents });  
  }
  else {
    response.json({ events: allEvents.filter(function(event) {
        return event.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
      }) 
    });
  }
}

/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'viewApi': viewApi,
  'listEventsJSON': listEventsJSON,
};