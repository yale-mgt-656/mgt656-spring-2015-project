'use strict';

/**
 * Controller that renders our scrum report page.
 */
function scrumReport (request, response) {
  var contextData = {};
  response.render('scrumreport.html', contextData);
}

module.exports = {
  scrumReport: scrumReport
};