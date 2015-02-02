'use strict';

var events = require('../models/events');

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Make It So: Events for Trekkies',
    'tagline': 'Resistance is futile.',
    'events': events.all
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
