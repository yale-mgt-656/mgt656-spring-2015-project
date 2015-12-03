'use strict';

/**
 * Controller that renders our about page.
 */
function about (request, response) {
  var contextData = {};
  response.render('about', contextData);
}

module.exports = {
  about: about
};
