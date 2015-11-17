'use strict';

var reports = require('../models/reports');



/**
 * Controller that renders a list of events in HTML.
 */
function listReports(request, response) {
   var contextData = {
     'reports': reports.all
   };
   response.render('reports.html', contextData);
}


/**
 * Controller that renders a single report in HTML.
 */
function reportDetail (request, response) {
  var rpt = reports.getById(parseInt(request.params.id));
  if (rpt === null) {
    response.status(404).send('No such report');
  } else
    response.render('report-detail.html', {report: rpt});
}


/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'reportDetail': reportDetail,
  'listReports': listReports
};