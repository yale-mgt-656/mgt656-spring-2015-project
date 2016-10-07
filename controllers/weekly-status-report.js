'use strict';

/**
 * Controller that renders our weekly status report page.
 */
function weeklystatusreport (request, response) {
  var contextData = {};
  response.render('weekly-status-report.html', contextData);
}

module.exports = {
  weeklystatusreport: weeklystatusreport
};