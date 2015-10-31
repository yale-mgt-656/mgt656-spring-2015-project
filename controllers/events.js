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

/*
 * controller to check if an input is an integer and in a certain range
 */
function validatIntInRange (request, fieldName, minVal, maxVal, contextData)
{
  var value = null;
  if (validator.isInt(request.body[fieldName]) === false) {
    contextData.errors.push('Your ' + fieldName + ' should be an intiger.');
  }
  else
  {
    value = parseInt(request.body[fieldName],10);
    if (value>maxVal || value<minVal) {
      contextData.errors.push('Your ' + fieldName + ' should be between ' + minVal + ' and ' + maxVal + '.');
    }
  }
  return value;
}

/*
 * to handle the form fields, if a filed is empty a place holder apears otherwise the previuos value
 */

function formHandler (contextData,fieldData,fieldName)
{
  if (fieldData !== null)
  {
    contextData.event_details[fieldName][0] = 'value';
    contextData.event_details[fieldName][1] = fieldData;
  }
  else
  {
    contextData.event_details[fieldName][0] = 'placeholder';
    contextData.event_details[fieldName][1] = 'Event ' + fieldName;
  }
}


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
  var event_details = {title: [2], location: [2], image: [2],
                       year: [2], month: [2], day: [2],
                       hour: [2], minute: [2]};
  var contextData = {event_details};
  formHandler (contextData,null,'title');
  formHandler (contextData,null,'location');
  formHandler (contextData,null,'image');
  formHandler (contextData,null,'year');
  formHandler (contextData,null,'month');
  formHandler (contextData,null,'day');
  formHandler (contextData,null,'hour');
  formHandler (contextData,null,'minute');
  response.render('create-event.html', contextData);
}

/**
 * Controller to which new events are submitted.
 * Validates the form and adds the new event to
 * our global list of events.
 */
 
function saveEvent(request, response){
  var event_details = {title: [2], location: [2], image: [2],
                       year: [2], month: [2], day: [2],
                       hour: [2], minute: [2]};
  var contextData = {errors: [], event_details};

  var title = request.body.title;
  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your title should be between 5 and 50 letters.');
    title = null;
  }
  
  var location = request.body.location;
  if (validator.isLength(request.body.location, 1, 50) === false) {
    contextData.errors.push('Your location should be at least one letter and less than 50.');
    location = null;
  }
  
  var year = validatIntInRange(request, 'year', 2015, 2016, contextData); // year validation nd error massage
  var month = validatIntInRange(request, 'month', 0, 11, contextData);    // month validation nd error massage
  var day = validatIntInRange(request, 'day', 1, 31, contextData);        // day validation nd error massage
  var hour = validatIntInRange(request, 'hour', 0, 23, contextData);      // hour validation nd error massage
  
  var minute = null;
  if (validator.isInt(request.body.minute) === false) {
    contextData.errors.push('Your minutes should be an intiger.');
  }
  else
  {
    minute = parseInt(request.body.minute,10);
    if (minute!==0 && minute!==30) {
      contextData.errors.push('Your minutes should be either 30 or 00.');
    }
  }
  
  // Validate the image
  var image = request.body.image;
  var imageStart = new RegExp("^https://|^http://");
  var imageEnd = new RegExp(".gif$|.png$");
  
  if ( (imageStart.test(image) === false) || (imageEnd.test(image) === false) )
  {
    contextData.errors.push('Your imgae should start with http:// or https:// and end with .gif or .png.');
    image = null;
  }
  
  formHandler (contextData,title,'title');
  formHandler (contextData,location,'location');
  formHandler (contextData,image,'image');
  formHandler (contextData,year,'year');
  formHandler (contextData,month,'month');
  formHandler (contextData,day,'day');
  formHandler (contextData,hour,'hour');
  formHandler (contextData,minute,'minute');
  
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
  else
  {
    response.render('event-detail.html', {event: ev});
  }
    
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