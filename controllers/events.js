'use strict';

var events = require('../models/events');
var validator = require('validator');
var lodash = require('lodash');
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
  days: lodash.range(1,32),
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


function isRangedInt(number, name, min, max, errors){
  if(validator.isInt(number)){
    var numberAsInt = parseInt(number);
    if(number >= min && number <= max){
      return;
    }
  }
  errors.push(name + " should be an int in the range " + min + " to " + max);
}


/**
 * Controller to which new events are submitted.
 * Validates the form and adds the new event to
 * our global list of events.
 */
function saveEvent(request, response){
  var contextData = {errors: [], allowedDateInfo: allowedDateInfo};

  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your title should be between 5 and 100 letters.');
  }

  if (validator.isLength(request.body.location, 5, 50) === false) {
    contextData.errors.push('Your location should be less than 50 characters.');
  }

  isRangedInt(request.body.year, "year", allowedDateInfo.years[0], allowedDateInfo.years[allowedDateInfo.years.length-1], contextData.errors);
  isRangedInt(request.body.day, "day", allowedDateInfo.days[0], allowedDateInfo.days[allowedDateInfo.days.length-1], contextData.errors);
  isRangedInt(request.body.hour, "hour", allowedDateInfo.hours[0], allowedDateInfo.hours[allowedDateInfo.hours.length-1], contextData.errors);
  isRangedInt(request.body.minute, "minute", allowedDateInfo.minutes[0], allowedDateInfo.minutes[allowedDateInfo.minutes.length-1], contextData.errors);
  isRangedInt(request.body.month, "month", 0, 11, contextData.errors);

  if (!validator.isURL(request.body.image) || (request.body.image.match(/\.(gif|png)$/i) === null )){
    contextData.errors.push('Your image should be a png or gif');
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
    // response.status(404).send('No such event'); // 404 PAGE NEEDS TO BE BETTER DEFINED
    response.render('event-detail.html', {event: ev});
  }
  response.render('event-detail.html', {event: ev});
}


// what is called when someone rsvps to an event
function rsvp (request, response){
  // takes the incoming params id and identifies the event user wants to RSVP to and then stores in variable "ev"
  var ev = events.getById(parseInt(request.params.id));
  // if it doesn't find the event, it says 'No such event'
  if (ev === null) {
    response.status(404).send('No such event');
  }

  if(validator.isEmail(request.body.email) && request.body.email.toLowerCase().indexOf('@yale.edu') !== -1){
    ev.attending.push(request.body.email);
    // Need to add a directive to save the event here.
    response.redirect('/events/' + ev.id);
  }else{
    var contextData = {errors: [], event: ev};
    if(request.body.email.toLowerCase().indexOf('harvard') !== -1){
      contextData.errors.push('Harvard not allowed!');
    }else{
      contextData.errors.push('Invalid email! Are you a Yale student?');
    }
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
