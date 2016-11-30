'use strict';

/**
 * Controller that renders our about page.
 */
function about (request, response) {
  var contextData = {};
  response.render('about.html', contextData);
}
function documentation1 (request, response) {
  var contextData = {};
  response.render('documentation.html', contextData);
}

module.exports = {
  about: about,
  'documentation1': documentation1
};