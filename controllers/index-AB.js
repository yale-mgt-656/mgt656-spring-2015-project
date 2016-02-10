'use strict';
var events = require('../models/events');
/**
 * Controller that renders our index (home) page.
 */
function indexAb (request, response) {
  var now = new Date();
  var contextData = {
    'title': 'MGT 656',
    'tagline': 'Yes, we ripped off EventBrite.',
    'events': []
  };
  for(var i=0; i<events.all.length;i++){
    var event = events.all[i];
    if(event.date>now){
      contextData.events.push(event);
    }
  }
  
  response.render('index_AB.html', contextData);
}

module.exports = {
  index: indexAb
};
