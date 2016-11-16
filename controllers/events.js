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

  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your title should be between 5 and 50 letters.');
  }

if (validator.isLength(request.body.location, 5, 50) === false) {
    contextData.errors.push('Your location should be less than 50 letters.');
  }
  
  console.log(request.body.year);

if (request.body.year > 2017 && request.body.year < 2015) {
    contextData.errors.push('Year should be 2016 or 2017');
  }

if (validator.isInt(request.body.year) === false){
    contextData.errors.push('Year should be an integer');
  }

if (request.body.month > 11 && request.body.month <0 ) {
    contextData.errors.push('Month must be between 0 and 11');
  }

if (validator.isInt(request.body.month) === false){
    contextData.errors.push('month should be an integer');
  }

if (request.body.date > 31 && request.body.date <1) {
    contextData.errors.push('Date must be between 1 and 31');
  }

if (validator.isInt(request.body.date) === false){
    contextData.errors.push('date should be an integer');
  }

if (request.body.hour > 23 && request.body.hour <0) {
    contextData.errors.push('Hour must be between 0 and 23');
  }

if (validator.isInt(request.body.hour) === false){
    contextData.errors.push('hour should be an integer');
  }
  
console.log(request.body.minute);
console.log(validator.equals(request.body.minute, "00"));

if (validator.equals(request.body.minute, "00") === false || validator.equals(request.body.minute, "30") === false) {
    contextData.errors.push('Minute must be either 00 or 30');
  }
   
if (validator.contains(request.body.email,'@yale.edu') === false) {
    contextData.errors.push('Your email must contain @yale.edu');
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