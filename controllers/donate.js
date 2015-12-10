'use strict';

/**
 * Controller that renders a list of events in HTML.
 */
function donate (request, response) {
  var contextData = {
    title: 'SOM class of 2016 & 2017 Party Central',
    tagline: 'Lets get ready to party.'
  };
  response.render('donate.html', contextData);
}




/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'donate': donate,
};