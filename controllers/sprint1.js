'use strict';

/**
 * Controller that renders our sprint reports page.
 */
function sprint1 (request, response) {
  var contextData = {};
  response.render('sprint1.html', contextData);
}

module.exports = {
  sprint1: sprint1
};