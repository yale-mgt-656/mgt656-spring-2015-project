'use strict';

/**
 * Controller that renders our about page.
 */
function rules (request, response) {
  var contextData = {};
  response.render('rules.html', contextData);
}

module.exports = {
  rules: rules
};