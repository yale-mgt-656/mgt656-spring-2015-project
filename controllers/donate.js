'use strict';

var events = require('../models/events');

/**
 * Controller that renders a list of events in HTML.
 */
function donate (request, response) {
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }
  response.render('donate.html', {event: ev});
}




/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'donate': donate,
};