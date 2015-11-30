'use strict';

/**
 * Controller that renders our index (home) page.
 */
 
var events = require('../models/events'); 

function index (request, response) {
  var currentTime = new Date();
  var contextData = {
    'title': 'MGT 656',
    'tagline': 'You are doomed (just kidding).',
    'events': events.all,
    'time': currentTime
  };
  response.render('index.html', contextData)
}

module.exports = {
  index: index
};
