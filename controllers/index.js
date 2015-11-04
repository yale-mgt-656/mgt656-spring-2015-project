'use strict';

var events = require('../models/events');
/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var now = new Date();
  var contextData = {
    'title': 'Epic Snowflake\'s Not-So-Epic Ticket Co.',
    'tagline': 'Delivering tickets one sprint at a time.',
    'events': []
  };
  for(var i = 0; i < events.all.length; i++) {
    var event = events.all[i];
    if (event.date > now) {
      contextData.events.push(event);
    }
  }
  response.render('index.html', contextData);
}
/**
 * Controller that renders a list of events in HTML.
 */
function listEvents(request, response) {
  var currentTime = new Date();
  var contextData = {
    'events': events.all,
    'time': currentTime
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
