'use strict';
var events = require('../models/events');
/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var now = new Date();
  var contextData = {
    'title': 'relax socialize visit party',
    'tagline': 'rsvp!',
    'events': []
   
   /** 'time': currentTime */
  };
  for(var i=0; i < events.all.length; i++){
    var event = events.all[i];
    
    if(event.date > now){
      contextData.events.push(event);
    }
  }
  /**var currentTime = new Date(); */
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
