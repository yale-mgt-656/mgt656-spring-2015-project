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
    contextData.errors.push('Your title should be between 5 and 100 letters.');
  }
  
  //check that year is an integer
  if (validator.isInt(request.body.year) === false) {
    contextData.errors.push('Your year should be an integer.');
  }
  
  //check whether the year is in 2015 or 2016
  var year = parseInt(request.body.year, 10);
  if (year > 2016 || year < 2015) {
    contextData.errors.push('Year should either be 2015 or 2016.');
  }
  
  //check that month is an integer
  if (validator.isInt(request.body.month) === false) {
    contextData.errors.push('Your month should be an integer.');
  }
  
  //check whether the month is > 11 || < 0
  var month = parseInt(request.body.month, 10);
  if (month > 11 || month < 0) {
    contextData.errors.push('Year should month should be greater than 0 and less than 12.');
  }
  
  //check that day is an integer
  if (validator.isInt(request.body.day) === false) {
    contextData.errors.push('Your day should be an integer.');
  }
  
  //check whether the day is > 31 || < 1
  var day = parseInt(request.body.day, 10);
  if (day > 31 || day < 1) {
    contextData.errors.push('Day cannot be larger than 32 or smaller than 1.')
  }
  
  //check that hour is an integer
  if (validator.isInt(request.body.hour) === false) {
    contextData.errors.push('Your hour should be an integer.');
  }
  
  //check whether the hour is > 23 || < 0
  var hour = parseInt(request.body.hour, 10);
  if (hour > 23 || hour < 0) {
    contextData.errors.push('Day cannot be larger than 32 or smaller than 1.')
  }
  
  //check whether image is gif or png
  //function getFileExtension(filename){
    //return filename.split('.').pop();
    //console.log(filename.split('.').pop());
  //}
  
  //function to validate file extension
    function validateFileExtension(fld) 
      {
       if(!/(\.gif|\.png)$/i.test(fld)) 
         {
           //contextData.errors.push('Your image must be either a gif or png.')
           return false;
          }
        return true;
       }
       
     if (!(validateFileExtension(request.body.image))) {
       contextData.errors.push('Your image must be either a gif or png.')
     }
  
  //var image = getFileExtension(toString(request.body.image));
  //if ((request.body.image != "gif") || (image != "png")) {
    //contextData.errors.push('Your image must be either a gif or png.')
  //}
  
  //check that image is a URL
  if (validator.isURL(request.body.image) === false) {
    contextData.errors.push('You must use a valid URL for your image location.');  
  }
  
  //check that location is not NULL and less than 50 chars
  if (validator.isLength(request.body.location, 1, 49) === false) {
    contextData.errors.push('Your location name cannot be empty and must be less than 50 characters.');  
  }
  
  var minute = parseInt(request.body.minute, 10);
  
  if (contextData.errors.length === 0) {
    var newId = events.all.length + 1;
    var newEvent = {
      id: newId,
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(year,month,day,hour,minute,0), //will follow the same for the rest after the validations are done
      attending: []
    };
    events.all.push(newEvent);
    response.redirect('/events/' + newId);
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

  if(validator.isEmail(request.body.email) && request.body.email.toLowerCase().indexOf("@yale.edu") != -1){
    ev.attending.push(request.body.email);
    response.redirect('/events/' + ev.id);
  }else{
    var contextData = {errors: [], event: ev};
    contextData.errors.push('Invalid email');
    response.render('event-detail.html', contextData);    
  }

function api(request, response){
  var output = {events: []};
  console.log('foo is equal to ', request.query.foo);
  var search = request.query.search;
  if(search){
     for(var i=0; i < events.all.length; i++){
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
 * Controller to which rsvp is submitted.
 * Validates the rsvp email and adds the new attendee to
 * our list of attendees.
 */
function rsvp(request, response){
  var contextData = {errors: []};
  var ev = events.getById(parseInt(request.params.id));

    if(validator.isEmail(request.body.email) && request.body.email.toLowerCase().indexOf("@yale.edu") != -1){
    ev.attending.push(request.body.email);
    response.redirect('/events/' + ev.id);
  }else{
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
  'rsvp': rsvp,
  'api': api
};