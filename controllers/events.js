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
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
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
  }else if(!request.body.image.match(/\.(gif|png)$/i)){
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
  }if (validator.isInt(request.body.minute) === false){ 
    contextData.errors.push('Invalid minute!');
  }else if(request.body.minute !== '0' && request.body.minute !== '30'){
    contextData.errors.push('Minute must be 0 or 30!');
  }
  

  if (contextData.errors.length === 0) {
    var newEventID = events.getMaxID() + 1;
    var newEvent = {
      id: newEventID,
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(request.body.year, request.body.month, request.body.day, request.body.hour, request.body.minute),
      attending: []
    };
    events.all.push(newEvent);

    var redirectPath = '/events/' + newEventID;
    response.redirect(302, redirectPath);
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
  var checkDomain = request.body.email.toLowerCase();
  if (ev === null) {
    response.status(404).send('No such event');
  }

  if(validator.isEmail(request.body.email)){
    if(checkDomain.indexOf('yale.edu') === checkDomain.length - 'yale.edu'.length){
      console.log(checkDomain);
      ev.attending.push(request.body.email);
      response.redirect('/events/' + ev.id);
    }else{
      contextData.errors.push('Yale emails only!');
      response.render('event-detail.html', contextData);    
    }
  
  }else{
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