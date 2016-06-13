'use strict';
var events = require('../models/events');
/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'RSVPd',
    'tagline': 'The one stop for all events in town!',
    'events': events.all,
    'time': currentTime
  };
  var currentTime = new Date();
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
