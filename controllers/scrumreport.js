'use strict';

/**
 * Controller that renders our scrum report page.
 */
function scrumReport1 (request, response) {
  var contextData = {};
  response.render('scrumreport1.html', contextData);
}

module.exports = {
  scrumReport1: scrumReport1
};