'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'RSVPd',
    'tagline': 'The one stop for all events in town!'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
