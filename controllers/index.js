'use strict';
var events = require('../models/events');
/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Our Eventbrite Ripoff',
    'tagline': 'Reckless Sound is Awesome!',
    'events': events.all
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
