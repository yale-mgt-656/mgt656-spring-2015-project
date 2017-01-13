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
  hours: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ],
  years: [2015, 2016],
  days: lodash.range(1, 32)
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


function checkIntRange(request, fieldName, minVal, maxVal, contextData){
  var value=null;
  if (validator.isInt(request.body[fieldName])===false){
    contextData.errors.push('Your' + fieldName + 'should be an integer');
  }
  else{
    value=parseInt(request.body[fieldName],10);
    if (value>maxVal || value<minVal){
      contextData.errors.push('Your ' + fieldName + ' should be in the range of' + minVal + '-'+ maxVal);
    }
  }
  return value;
}

function checkImage(request, picture, contextData){
  var value = request.body[picture];
  if(value === ''){
    contextData.errors.push('you need a image');
  }
  else{
    if(value.indexOf(/https|http/)<0){
      console.log('has http ');
      contextData.errors.push('Your image does not begin with https or http.');
    }
    
    if(value.indexOf(/\.(png|gif)$/)<0){
      contextData.errors.push('Your image does not end with png or gif.');
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
  var contextData = {errors: [], allowedDateInfo: allowedDateInfo};

  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your title should be between 5 and 50 letters.');
  }
  
 if (validator.isLength(request.body.location, 5, 50) === false) {
    contextData.errors.push('Your location should be between 5 and 50 letters.');
  }
  
  var year = checkIntRange(request,'year',2015,2016,contextData);
  var month = checkIntRange(request,'month',0,11,contextData);
  var imag = checkImage(request,'image',contextData);
  var day = checkIntRange(request,'day',1,31,contextData);
  var hour = checkIntRange(request,'hour',0,23,contextData);


  if (contextData.errors.length === 0) {
    var newEvent = {
      id: events.getMaxId() + 1,
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(),
      attending: []
    };
    events.all.push(newEvent);
    response.redirect('/events/' + newEvent.id);
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
    var mail=request.body.email.toUpperCase();
    if (mail.indexOf('@YALE.EDU')>-1){
      ev.attending.push(request.body.email);
      response.redirect('/events/' + ev.id);
    }
   else{
    var contextData = {errors: [], event: ev};
    contextData.errors.push('Invalid email');
    response.render('event-detail.html', contextData);    
  }
}
}

function api(request, response){
  var output = {events: []};
  var search = request.query.search;
  
  if (search){
    for(var i=0; i<events.all.length; i++){
      if(events.all[i].title.indexOf(search)!==-1){
        output.events.push(events.all[i]);
      }
    }
  }else {
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
  'api':api
};

