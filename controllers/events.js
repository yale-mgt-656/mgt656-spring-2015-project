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
  ],
  years: [2015, 2016],
  days: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ],
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

if (validator.isInt(request.body.year) === false) {
    contextData.errors.push('Your year should be an integer.');
  }

if (validator.isInt(request.body.month) === false) {
    contextData.errors.push('Your month should be an integer.');
  }
  
  if (validator.isInt(request.body.day) === false) {
    contextData.errors.push('Your day should be an integer.');
  }

if (validator.isInt(request.body.hour) === false) {
    contextData.errors.push('Your hour should be an integer.');
  }

if (validator.isURL(request.body.image) === false) {
    contextData.errors.push('Your image should be a URL.');
  }

if (!request.body.image.match(/\.(png|gif)$/)) {
    contextData.errors.push('Your image should be a png or gif file.');
}

var year = parseInt(request.body.year, 10);
if (year > 2016 || year < 2015) {
    contextData.errors.push('Your year should be 2015 or 2016.');
  }

var month = parseInt(request.body.month, 10);
if (month > 11 || month < 0) {
    contextData.errors.push('Your month should be between 0 and 11, inclusive.');
  }

var day = parseInt(request.body.day, 10);
if (day > 31 || day < 1) {
    contextData.errors.push('Your day should be between 1 and 31, inclusive.');
  }

var hour = parseInt(request.body.hour, 10);
if (hour > 23 || hour < 0) {
    contextData.errors.push('Your hour should be between 0 and 23, inclusive.');
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