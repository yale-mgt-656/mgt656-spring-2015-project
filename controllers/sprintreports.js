'use strict';

/**
 * Controller that renders our sprint reports page.
 */
function sprintreports (request, response) {
  var contextData = {};
  response.render('sprintreports.html', contextData);
}

module.exports = {
  sprintreports: sprintreports
};