'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'C U There',
    'tagline': 'I\'m in!'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
