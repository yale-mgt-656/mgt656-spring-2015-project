'use strict';

var events = require('../models/events');

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Shavents',
    'tagline': 'Where the fun never stops.',
    'events': events.all
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
