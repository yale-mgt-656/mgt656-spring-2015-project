'use strict';

var events = require('../models/events');



/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var currentTime = new Date();
  var currentEvents = [];
  for (var i = 0; i < events.all.length; i++)
  {
    var event = events.all[i];
    if (event.date > currentTime)
    {
      currentEvents.push(event);
    }
  }
  var contextData = {
    'events': currentEvents,
    'title': 'C U There',
    'time': currentTime,
    'tagline': 'I\'m in!'
  };
  
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};