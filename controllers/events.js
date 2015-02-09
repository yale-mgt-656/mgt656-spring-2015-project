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
  var contextData = {};
  response.render('create-event.html', contextData);
}

/**
 * Controller to which new events are submitted.
 * Validates the form and adds the new event to
 * our global list of events.
 */
function saveEvent(request, response){
  var contextData = {errors: []};

  if (validator.isLength(request.body.title, 1, 50) === false) {
    contextData.errors.push('Your title should be between 1 and 50 letters.');
  }
  
  if (validator.isLength(request.body.location, 1, 50) === false) {
    contextData.errors.push('Your location should be between 1 and 50 letters.');
  }

  if (validator.isURL(request.body.image) === false){
    contextData.errors.push('Please provide valid url for image!');
  }else if(validator.contains(request.body.image, "gif") === false && validator.contains(request.body.image, ".png") === false){
    contextData.errors.push('Image must be gif or png!');
  }
  
  if (validator.isInt(request.body.year) === false){ 
    contextData.errors.push('Invalid year!');
  }else if(request.body.year > 2016 || request.body.year < 2015){
    contextData.errors.push('Invalid year!');
  }
  
  if (validator.isInt(request.body.month) === false){ 
    contextData.errors.push('Invalid month!');
  }else if(request.body.month > 11 || request.body.month < 0){
    contextData.errors.push('Invalid month!');
  }
  
  if (validator.isInt(request.body.day) === false){ 
    contextData.errors.push('Invalid day!');
  }else if(request.body.day > 31 || request.body.day < 1){
    contextData.errors.push('Invalid day!');
  }
  
  if (validator.isInt(request.body.hour) === false){ 
    contextData.errors.push('Invalid hour!');
  }else if(request.body.hour > 23 || request.body.hour < 0){
    contextData.errors.push('Invalid hour!');
  }
  

  if (contextData.errors.length === 0) {
    var newEventNumber = events.all.length;
    var newEvent = {
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(),
      attending: []
    };
    events.all.push(newEvent);
    
    var redirectPath = '/events/' + newEventNumber;
    
    response.redirect(redirectPath );
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

  if(validator.isEmail(request.body.email)){
    ev.attending.push(request.body.email);
    response.redirect('/events/' + ev.id);
  }else{
    var contextData = {errors: [], event: ev};
    contextData.errors.push('Invalid email');
    response.render('event-detail.html', contextData);    
  }

}

function api(request, response){
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