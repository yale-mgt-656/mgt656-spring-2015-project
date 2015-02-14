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
    contextData.errors.push('Your title should be greater than 0 and less than 50 letters.');
  }
  
  if (validator.isLength(request.body.location, 1, 50) === false) {
    contextData.errors.push('Your location should be greater than 0 and less than 50 letters.');
  }
  
  if (request.body.image.indexOf('http://') !== 0 && request.body.image.indexOf('https://') !== 0) {
    contextData.errors.push('Your image URL should start with http:// or https://');
  }
  
  if (!validator.isIn(request.body.image.substring(request.body.image.length - 4, request.body.image.length),['.gif', '.png'])) {
    contextData.errors.push('Your image URL should end with .gif or .png');
  }
  
  if (request.body.year !== '2015' && request.body.year !== '2016') {
    contextData.errors.push('Your year should be 2015 or 2016.');
  }
  
  if (parseInt(request.body.month) < 0 || parseInt(request.body.month) > 11) {
    contextData.errors.push('Your month should be an actual month.  How did you evade the selector??');
  }
  
  if (parseInt(request.body.day) < 0 || parseInt(request.body.day) > 31) {
    contextData.errors.push('Your day should be between 1 and 31.  How did you evade the selector??');
  }
  
  if (parseInt(request.body.hour) < 0 || parseInt(request.body.hour) > 23) {
    contextData.errors.push('Your hour should be between 0 and 23.  How did you evade the selector??');
  }
  
  if (parseInt(request.body.minute) < 0 || parseInt(request.body.minute) > 30) {
    contextData.errors.push('Your minutes should be 0 or 30.  How did you evade the selector??');
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
  var contextData = {errors: [], event: ev};
    //var lowerCaseEmail = request.body.email.toLowerCase();

  if (ev === null) {
    response.status(404).send('No such event');
  }

  if(validator.isEmail(request.body.email)){
    if(validator.contains(request.body.email,'yale.edu')){
      ev.attending.push(request.body.email);
      response.redirect('/events/' + ev.id);
    }
    else{
      contextData.errors.push('Yale emails only');
      response.render('event-detail.html', contextData);
    }

  }
  else{
      contextData.errors.push('Not a valid email');
      response.render('event-detail.html', contextData);
  }

}

function donate (request, response){
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }

  response.render('event-donate.html', {event: ev});    
}

function api (request, response){
    var output = {events: []};
    var search = request.query.search;
    if(search){
      for(var i = 0; i < events.all.length; i++){
        if(events.all[i].title.indexOf(search) !== -1){
          output.events.push(events.all[i]);
        }
      }
    }
    else{
      output.events.push(events.all);
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
  'donate': donate,
  'api' : api
};