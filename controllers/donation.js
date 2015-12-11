'use strict';

/**
 * Controller that renders our donation page.
 */
 
 
var events = require('../models/events');

function donate (request, response) {
  var ev = events.getById(parseInt(request.params.id,10));
  if (ev === null) {
    response.status(404).send('No such event');
  }
  else
  {
    response.render('donation.html', {event: ev});
  }
    
}

module.exports = {
  donationPage: donate
};