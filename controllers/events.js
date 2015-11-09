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

  //The title must be less than 50 characters
  if (validator.isLength(request.body.title, 0, 50) === false) {
    contextData.errors.push('Your title should be less than 50 letters.');
  }
  
  if (request.body.title.length === 0) {
    contextData.errors.push('Your title length is 0, which leads the Hyperactive Alligators to believe that you did not put anything here. That is a problem; please add the image url.');
  }

//  The location must be less than 50 characters
  if (validator.isLength(request.body.location, 0, 50) === false) {
    contextData.errors.push('Your location should be less than 50 characters.');
  }
  
  if (request.body.location.length === 0) {
    contextData.errors.push('Your location length is 0, which leads the Hyperactive Alligators to believe that you did not put anything here. That is a problem; please add the image url.');
  }

//The year must be 2015 or 2016
  if (Number(request.body.year) != 2015
  && Number(request.body.year) != 2016) {
    contextData.errors.push('Your year needs to be either 2015 or 2016');
  }
//  The month must be between 0 to 11, inclusive
  if (Number(request.body.month) < 0
  || Number(request.body.month) > 11
  || Number(request.body.month)%1 !== 0) {
    contextData.errors.push('Your month selection value is not an integer between 0 and 11. This means that the select option value for month on the HTML page is incorrect, most likely.');
  }

// The hour must be an integer between 0-23
  if (Number(request.body.hour) < 0
  || Number(request.body.hour) > 23
  || Number(request.body.hour)%1 !== 0) {
    contextData.errors.push('Your hour selection value is not an integer between 0 and 23. This means that the select option value for hour on the HTML page is incorrect, most likely.');
  }

// The day must be between 1 and 31, an integer
  if (Number(request.body.day) < 1
  || Number(request.body.day) > 31
  || Number(request.body.day)%1 !== 0) {
    contextData.errors.push('Your day selection value is not an integer between 1 and 31. This means that the select option value for day on the HTML page is incorrect, most likely.');
  }

//  The minute must be 0 or 30
  if (Number(request.body.minute) !== 0
  && Number(request.body.minute) !== 30) {
    contextData.errors.push('Your minute selection value is not 0 or 30. This means that the select option value for minute on the HTML page is incorrect, most likely.');
  }

//  The image URL must begin with ‘http://’ or ‘https://’ and end with ‘.gif’ or ‘.png’.
  if (request.body.image.length === 0) {
    contextData.errors.push('Your image url length is 0, which leads the Hyperactive Alligators to believe that you did not put anything here. That is a problem; please add the image url.');
  }
  
  if (request.body.image.substring(0,7) != "http://" 
  && request.body.image.substring(0,8) != "https://") {
    contextData.errors.push('Your url for your image should start with either {https:// | http://}');
  }
  
  if (request.body.image.substring(request.body.image.length - 4,request.body.image.length) != ".png"
  && request.body.image.substring(request.body.image.length - 4,request.body.image.length) != ".img") {
    contextData.errors.push('Your url for your image should your file should end with {.img | .png}.');
  }
  
  if (contextData.errors.length === 0) {
    var newEvent = {
      id: events.eventMaxID() + 1,
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(),
      attending: []
    };
    events.all.push(newEvent);
    //response.redirect('/events');
    response.redirect(302, '/events/'+ newEvent.id);
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