'use strict';

/**
 * Controller that renders our about page.
 */
function sprintreport (request, response) {
  var contextData = {};
  response.render('sprint-report-4.html', contextData);
}
function sprintreport5 (request, response) {
  var contextData = {};
  response.render('sprint-report-5.html', contextData);
}
function sprintreport6 (request, response) {
  var contextData = {};
  response.render('sprint-report-6.html', contextData);
}

function finalreport (request, response) {
  var contextData = {};
  response.render('final-report.html', contextData);
}


module.exports = {
  sprintreport: sprintreport,
  sprintreport5:sprintreport5,
  sprintreport6:sprintreport6,
  finalreport:finalreport,
};