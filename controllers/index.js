'use strict';

var events = require('../models/events');

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'MGT 656',
<<<<<<< HEAD
    'tagline': 'Where Your Wildest Dreams Come True.'
=======
    'tagline': 'You are doomed (just kidding).',
    'events':events.all
>>>>>>> Add list of events to homepage
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
