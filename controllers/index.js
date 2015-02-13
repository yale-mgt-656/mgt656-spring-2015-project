'use strict';

var events = require('../models/events');


/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Sparkling Sky',
    'tagline': 'For all the sparkling events.',
    'events': events.all
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
