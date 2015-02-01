'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Project Mangrove',
    'tagline': 'Eventbrite for trees'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
