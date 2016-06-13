'use strict';

/**
 * Controller that renders our index (home) page.
 */

var events = require('../models/events');

function index (request, response) {
  var contextData = {
    'title': 'Divine Surf',
    'tagline': 'You should put on some sunscreen.',
    'events': events.all
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
