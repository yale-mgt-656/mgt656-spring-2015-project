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
  response.render('events.html', contextData);
}

/**
 * Controller that renders a page for creating new events.
 */
function newEvent(request, response){
  var contextData = {};
  response.render('create-event.html', contextData);
}

function checkIntRange(request, fieldName, minVal, maxVal, contextData){
  var value = null;
  if (validator.isInt(request.body[fieldName]) === false) {
    contextData.errors.push('Your ' + fieldName + 'year should be an integer.');
  }else{
    value = parseInt(request.body[fieldName], 10);
    if (value > maxVal || value <minVal) {
      contextData.errors.push('Your ' + fieldName + 'should be in the range ' + minVal + '-' + maxVal + '.');
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

  if (validator.isLength(request.body.title, 0, 0) === true) {
    contextData.errors.push('Your title should not be empty');
  }
  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your title should be between 5 and 50 characters');
  }
  if (validator.isLength(request.body.location, 0, 0) === true) {
    contextData.errors.push('Your location should not be empty');
  }
  if (validator.isLength(request.body.location, 1, 50) === false) {
    contextData.errors.push('Your location should be less than 50 characters');
  }
  
  var yyear = checkIntRange(request, 'year', 2015, 2016, contextData);
 var mmonth = checkIntRange(request, 'month', 0, 11, contextData);
  var dday = checkIntRange(request, 'day', 1, 31, contextData);
  var hhour = checkIntRange(request, 'hour', 0, 23, contextData);
  var year=request.body.year;
  var month=request.body.month;
  var day=request.body.day;
  var hour=request.body.hour;
  var minute=request.body.minute;

  if (request.body.image.endsWith(".gif")== false && request.body.image.endsWith(".png")==false) {
    contextData.errors.push('image format must be .gif or .png');
  }  
  if (request.body.image.startsWith("http://")== false && request.body.image.startsWith("https://")==false  ) {
    contextData.errors.push('image url must begin with http:// or https://');
  }  

  if (contextData.errors.length === 0) {
    var newEvent = {
      id: events.all.length,
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(year, month, day, hour, minute, 0),
      attending: []
    };
    events.all.push(newEvent);
    response.redirect('/events/'+(events.all.length-1));
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
var flag=0;
  if(validator.isEmail(request.body.email)){
          flag=1;
          var temp=request.body.email;
          temp=temp.slice(temp.length-9,temp.length).toLowerCase();
          if(temp=="@yale.edu"){
             flag=2;
          }
  }
  if(flag==2){
    ev.attending.push(request.body.email);
    response.redirect('/events/' + ev.id);
  }
  else{
    var contextData = {errors: [], event: ev};
   if(flag==1)contextData.errors.push('non Yale student rejected.');
    else contextData.errors.push('Invalid email');
    response.render('event-detail.html', contextData); 
  }

}

function api(request, response){
  var output = {events: []};
  var search = request.query.search;
  
  if(search){
    for(var i =0; i < events.all.length; i++){
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

