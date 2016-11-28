'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'MGT 656',
    'tagline': 'Where Your Wildest Dreams Come True.'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
