'use strict';

var events = require('../models/events');

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var now = new Date();
  var contextData = {
    'title': 'Event Wire',
    'tagline': 'The newest way to create events!!',
    'events': []
  };
  for(var i=0; i < events.all.length; i++) {
    var event = events.all[i];
    if(event.date > now){
      contextData.events.push(event);
    }
  }
  response.render('index.html', contextData);
}
function donatecontrol (request, response) {
  var contextData = {};
  response.render('donation.html', contextData);
}
module.exports = {
  index: index,donatecontrol:donatecontrol
};

