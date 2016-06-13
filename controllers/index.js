'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Team Young Frost',
    'tagline': 'You are doomed (just kidding).'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
