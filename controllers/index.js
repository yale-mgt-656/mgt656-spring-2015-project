'use strict';

var events = require('../models/events');
/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Cosmic Brook',
    'tagline': 'You are now in heaven.',
    'events': events.all
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
