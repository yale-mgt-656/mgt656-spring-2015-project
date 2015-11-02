'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'MGT 656',
    'tagline': 'We are changing the tagline for fun.'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
