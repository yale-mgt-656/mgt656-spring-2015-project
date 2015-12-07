'use strict';

var events = require('../models/events');
var validator = require('validator');

// Date data that would be useful to you
// completing the project These data are not
// used a first.
//
var allowedDateInfo = {
  years: [2015, 2016],
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
  days: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31],
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
 * Controller that renders a list of events in JSON.
 */
function apiListEvents(request, response) {
  if (request.query.search)
    response.json({events: events.getByTitle(request.query.search)});
  else
    response.json({events: events.all});
}

/**
 * Controller that renders a page for creating new events.
 */
function newEvent(request, response){
  var contextData = {
    'allowedDateInfo': allowedDateInfo
  };
  response.render('create-event.html', contextData);
}

function checkIntRange(request, fieldName, minVal, maxVal, contextData){
  var value = null;
  if (validator.isInt(request.body[fieldName]) === false) {
    contextData.errors.push('Your ' + fieldName + ' should be an integer.');
  }else{
    value = parseInt(request.body[fieldName], 10);
    if (value > maxVal || value < minVal) {
    contextData.errors.push('Your ' + fieldName + ' should be in the range ' + minVal + '-' + maxVal);
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

  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your location should be between 5 and 50 letters.');
  }
  
  if (validator.isLength(request.body.location, 5, 50) === false) {
    contextData.errors.push('Your location should be between 5 and 50 letters.');
  }
  
  var year = checkIntRange(request, 'year', 2015, 2016, contextData);
  var month = checkIntRange(request, 'month', 0, 11, contextData);
  var day = checkIntRange(request, 'day', 1, 31, contextData);
  var hour = checkIntRange(request, 'hour', 0, 23, contextData);
  var minute = parseInt(request.body.minute);
  if (isNaN(minute) || (minute !== 0 && minute !== 30)) {
    contextData.errors.push('Your event\'s minute is not acceptable.');
  }
  
  if (validator.isURL(request.body.image) === false) {
    contextData.errors.push('Your image should be a URL.');
  }
  if (validator.matches(request.body.image, /http(s?):\/\/([a-z,0-9,.,\/,\?,=]+)(.gif|.png)/i) === false) {
    contextData.errors.push('Your image url is not valid. '+request.body.image);
  }

  if (contextData.errors.length === 0) {
    var newid = parseInt(events.nextId());
    var date = new Date(year, month, day, hour, minute, 0,0);
    var datestr = date.toDateString();
    var newEvent = {
      id: newid,
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date:datestr,
      attending: []
    };
    events.addEvent(newEvent, function(err, result){
      if (err) {
        contextData.errors.push(err);
        response.render('create-event.html', contextData);
      } else {
        response.redirect('/events/'+newid);
      }
    });
    // events.all.push(newEvent);
    // response.redirect('/events/'+newid);
    events.addEvent(newEvent, function(err, result){
      if (err) {
        contextData.errors.push(err);
        response.render('create-event.html', contextData);
      } else {
        response.redirect('/events/'+newid);
      }
    });
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
function eventDetail1 (request, response) {
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }
  response.render('event-detail1.html', {event: ev});
}

function rsvp (request, response){
  var eventId = parseInt(request.params.id);
  var ev = events.getById(eventId);
  if (ev === null) {
    response.status(404).send('No such event');
  }

  if(validator.isEmail(request.body.email) && request.body.email.match(/([a-z0-9\.-_])+@yale.edu/i)){
      events.addAttending(eventId, request.body.email, function(err, result){
        if (err) {
          contextData.errors.push(err);
          response.render('event-detail.html', contextData);
        } else {
          response.redirect('/events/' + ev.id);
        }
      });
  } else{
    var contextData = {errors: [], event: ev};
    contextData.errors.push('Invalid email or non-yale email address');
    response.render('event-detail.html', contextData);    
  }

}

/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'listEvents': listEvents,
  'apiListEvents': apiListEvents,
  'eventDetail': eventDetail,
  'eventDetail1': eventDetail1,
  'newEvent': newEvent,
  'saveEvent': saveEvent,
  'rsvp': rsvp
  
};