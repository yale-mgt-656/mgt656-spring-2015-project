'use strict';

var events = require('../models/events');
var validator = require('validator');

// Date data that would be useful to you
// completing the project These data are not
// used a first.
//
var allowedDateInfo = {
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
   days: {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  },
  minutes: [0, 30],
  hours: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ],
  years: [2015, 2016]
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
  var contextData = {allowedDateInfo: allowedDateInfo};
  response.render('create-event.html', contextData);
}

/*created a new function that we can use to validate numerical form inputs*/
function checkIntRange(request, fieldName, minVal, maxVal, contextData){
  var value = null;
  if (validator.isInt(request.body[fieldName]) === false) {
    contextData.errors.push('Your ' + fieldName +' should be an integer SUCKA!');
  }else{
    value = parseInt(request.body[fieldName], 10);
    if (value > maxVal || value < minVal) {
      contextData.errors.push('Your ' + fieldName + ' should be between ' + minVal + ' and ' + maxVal + ' SUCKA!');
    }
  }
  return value;
}

/**
 * Controller to which new events are submitted.
 * Validates the form and adds the new event to
 * our global list of events.
 */
function saveEvent(request, response){
  var contextData = {errors: []};

  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your title should be between 5 and 50 letters.');
  }
  //This runs the checkIntRange validator I created above
  var year = checkIntRange(request, 'year', 2015, 2016, contextData)
  var month = checkIntRange(request, 'month', 0, 11, contextData)
  var day = checkIntRange(request, 'day', 1, 31, contextData)
  var hour = checkIntRange(request, 'hour', 0, 23, contextData)

//this makes sure the pictures are either gif or png
  if (validator.matches(request.body.image, /\.(png|gif)$/) === false) {
    contextData.errors.push('Your image should be either a gif or a png... SUCKA!');
}

//this makes sure the pictures are in URL format
  if (validator.isURL(request.body.image) === false) {
    contextData.errors.push('Your image should be a URL... SUCKA!');
}

//makes sure there is a location entered and that it is less than 50 char long
  if (validator.isLength(request.body.location, 1, 50) === false) {
      contextData.errors.push('Your location should be between 1 and 50 letters... Shortay');
    }
    
  if (contextData.errors.length === 0) {
    var newEvent = {
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(),
      attending: []
    };
    events.all.push(newEvent);
    response.redirect('/events');
  }else{
    response.render('create-event.html', contextData);
  }
}

function eventDetail (request, response) {
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }
  response.render('event-detail.html', {event: ev});
}

function rsvp (request, response){
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }

  if(validator.isEmail(request.body.email) 
  && request.body.email.toLowerCase().indexOf('yale') !== -1){
    ev.attending.push(request.body.email);
    response.redirect('/events/' + ev.id);
    }else{
    var contextData = {errors: [], event: ev};
    if(request.body.email.toLowerCase().indexOf('harvard') !== -1){
      contextData.errors.push('Invalid email, punk');
    }else{
      contextData.errors.push('Invalid email');
    }
    response.render('event-detail.html', contextData);
    }
  }

/*add api search controller*/
function api (request, response){
  var output = {events: []};
  var search = request.query.search;
  
  if(search){
    for(var i = 0; i < events.all.length; i++){
      if(events.all[i].title.indexOf(search) !== -1){
      output.events.push(events.all[i]);
      }
    }
  }else{
    output.events = events.all;
  }
  response.json(output);
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
  'rsvp': rsvp,
  'api': api
};