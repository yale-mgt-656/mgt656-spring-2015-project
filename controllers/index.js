'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Divine Surf',
    'tagline': 'You should put on some sunscreen.'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
