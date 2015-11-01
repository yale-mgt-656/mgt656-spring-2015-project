'use strict';

var events = require('../models/events');

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Dusty Wind Events',
    'tagline': 'A community of trusty dusty events.',
    'events': events.all
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
