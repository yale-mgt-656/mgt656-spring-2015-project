'use strict';

/**
 * Controller that renders our Report page.
 */
function report (request, response) {
  var contextData = {};
  response.render('report2.html', contextData);
}

module.exports = {
  report: report
};