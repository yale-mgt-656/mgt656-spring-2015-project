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
 */
function listEventsJSON(request, response) {
  response.json({ events: events.all });
}

/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'viewApi': viewApi,
  'listEventsJSON': listEventsJSON,
};