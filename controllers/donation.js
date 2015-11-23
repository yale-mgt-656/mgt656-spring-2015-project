'use strict';

/**
 * Controller that renders our donation page.
 */
function donation (request, response) {
  var contextData = {};
  response.render('donation.html', contextData);
}

module.exports = {
  donation: donation
};