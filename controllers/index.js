'use strict';

/**
 * Controller that renders our index (home) page.
 */
var events = require('../models/events');

function index (request, response) {
  var currentTime = new Date();
  var contextData = {
    'title': 'MGT 656',
    'tagline': 'This is a tagline.',
    'events': [],
    'time': currentTime
  };
  for (var i=0; i < events.all.length; i++) {
    var event = events.all[i];
    if (event.date > currentTime) {
      contextData.events.push(event);
    }
  }
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
