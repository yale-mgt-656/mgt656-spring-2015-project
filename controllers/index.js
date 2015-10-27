'use strict';

var events = require('../models/events');

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var currentTime = new Date();
  var contextData = {
    'title': 'Half Mountain Events',
    'tagline': 'Check out our upcoming events!',
    'events': events.all,
    'time': currentTime
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
