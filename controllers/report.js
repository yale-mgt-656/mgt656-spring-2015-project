'use strict';

/**
 * Controller that renders our report page.
 */
function report (request, response) {
  var contextData = {};
  response.render('report.html', contextData);
}

module.exports = {
  report: report
};