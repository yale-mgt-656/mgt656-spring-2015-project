'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Epic Snowflake\'s Not-So-Epic Ticket Co.',
    'tagline': 'Delivering tickets one sprint at a time.'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
