'use strict';

var events = require('../models/events');
var validator = require('validator');

// Date data that would be useful to you
// completing the project These data are not
// used at first.
//
var allowedDateInfo = {
  years:[2015,2016],
  months: {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  },
  days: [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
    16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
  ],
  minutes: [0, 30],
  hours: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ]
};

/**
 * Controller that renders a list of events in HTML.
 */
function listEvents(request, response) {
  var currentTime = new Date();
  var contextData = {
    'events': events.all,
    'time': currentTime
  };
  response.render('event.html', contextData);
}

/**
 * Controller that renders a page for creating new events.
 */
function newEvent(request, response){
  var contextData = {
    allowedDateInfo
  };
  response.render('create-event.html', contextData);

}


/* Function to streamline form integer validation */

function checkIntRange(request, fieldName, minVal, maxVal, contextData){
    var value = null;
    if (validator.isInt(request.body[fieldName]) === false) {
    contextData.errors.push('Your ' + fieldName + ' should be an integer.');
  } else {
  var value = parseInt(request.body[fieldName], 10);
  if (value < minVal || value > maxVal) {
    contextData.errors.push('Your ' + fieldName + ' should be in the range ' + minVal + '-' + maxVal + '.');
  }
  }
}
 
/**
 * Controller to which new events are submitted.
 * Validates the form and adds the new event to
 * our global list of events.
 */
function saveEvent(request, response){
  var contextData = {
    errors: [],
    allowedDateInfo
  };


 
  var year = checkIntRange(request, 'year', 2015, 2016, contextData);
  var month = checkIntRange(request, 'month', 0, 11, contextData);
  var day = checkIntRange(request, 'day', 1, 31, contextData);
  var hour = checkIntRange(request, 'hour', 0, 23, contextData);
  
  var gifPng = request.body.image.match(/\.(png|gif)$/);
  if (gifPng === null && typeof gifPng === "object") {
    contextData.errors.push('Your image text must end in .png or .gif.');
  }
  
  if (validator.isURL(request.body.image) === false) {
    contextData.errors.push('Your image text must be a URL.');
  }
  // Project specs don't require a minimum length of 5. Need to update this code to reflect that.
  if (validator.isLength(request.body.location, 1, 50) === false) {
    contextData.errors.push('Your location should be between 1 and 100 letters.');
  }
  if (validator.isLength(request.body.title, 1, 50) === false) {
    contextData.errors.push('Your title should be between 1 and 100 letters.');
  }

  if (validator.isInt(request.body.minute) === false) {
    contextData.errors.push('Your minute should be an integer.');
  } else {
  var minute = parseInt(request.body.minute, 10);
  if ((minute == 0 || minute == 30) === false ) {
    contextData.errors.push('Your minute should be 0 or 30.');
  }
  }


  if (contextData.errors.length === 0) {
    var newEvent = {
      id: events.eventHighID() + 1, // how to add +1 to eventid
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(),
      attending: []
    };
    events.all.push(newEvent);
    // response.redirect(302, '/events/' + 2); // tester
    response.redirect(302, '/events/' + newEvent.id); //THIS WILL WORK when we fix new event detail page bug
  }
  else{
    response.render('create-event.html', contextData);
  }
}

function eventDetail (request, response) {
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }
  else{
  response.render('event-detail.html', {event:ev});
}
}

function rsvp (request, response){
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }

  if(validator.isEmail(request.body.email)){
    ev.attending.push(request.body.email);
    response.redirect('/events/' + ev.id);
  }else{
    var contextData = {errors: [], event: ev};
    contextData.errors.push('Invalid email');
    response.render('event-detail.html', contextData);    
  }

}

/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'listEvents': listEvents,
  'eventDetail': eventDetail,
  'newEvent': newEvent,
  'saveEvent': saveEvent,
  'rsvp': rsvp
 
};

