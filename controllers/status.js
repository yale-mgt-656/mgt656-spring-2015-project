'use strict';

/**
 * Controller that renders our about page.
 */
function status (request, response) {
  var contextData = {};
  response.render('status.html', contextData);
}

module.exports = {
  status: status
};