'use strict';

/**
 * Controller that renders our about page.
 */
function sprintreport (request, response) {
  var contextData = {};
  response.render('sprint-report4.html', contextData);
}

module.exports = {
  sprintreport: sprintreport
};