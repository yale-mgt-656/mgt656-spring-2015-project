'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Event Wire',
    'tagline': 'The newest way to create events!!'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
