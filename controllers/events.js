'use strict';

var events = require('../models/events');
var validator = require('validator');
var lodash = require('lodash');
var express = require('express');




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
  days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
  hours: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ],
  years: [2015, 2016]
};





/**
 * Controller that renders a list of events in HTML.
 */


function listEvents(req, res) {

  // var db = req.db;
  // var collection = db.get('eventlist');
  // var events = collection.find({},{},function(e,docs){
  //       res.json(docs);
  // });

  // console.log(events);

  var currentTime = new Date();
  var contextData = {
    'events': events.all,
    'time': currentTime
  };
  res.render('event', contextData);
}








/**
 * Controller that renders a page for creating new events.
 */
function newEvent(request, response){
  var contextData = {allowedDateInfo: allowedDateInfo};
  response.render('create-event.jade', contextData);
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



function saveEvent(req, res){

    // Set our internal DB variable
    var db = req.db;

    // Set our collection
    var collection = db.get('eventlist');


    var thingsToBring = [];
    thingsToBring.push(req.body.items);

    var newEvent = {
      id: events.getMaxId() + 1,
      title: req.body.title,
      location: req.body.location,
      image: req.body.image,
      date: new Date(),
      attending: [],
      items: thingsToBring
    };



    var contextData = {errors: [], allowedDateInfo: allowedDateInfo};

      if (validator.isLength(req.body.title, 5, 50) === false) {
        contextData.errors.push('Your title should be between 5 and 100 letters.');
      }

      if (validator.isLength(req.body.location, 5, 50) === false) {
        contextData.errors.push('Your location should be less than 50 characters.');
      }

      isRangedInt(req.body.year, "year", allowedDateInfo.years[0], allowedDateInfo.years[allowedDateInfo.years.length-1], contextData.errors);
      isRangedInt(req.body.day, "day", allowedDateInfo.days[0], allowedDateInfo.days[allowedDateInfo.days.length-1], contextData.errors);
      isRangedInt(req.body.hour, "hour", allowedDateInfo.hours[0], allowedDateInfo.hours[allowedDateInfo.hours.length-1], contextData.errors);
      isRangedInt(req.body.minute, "minute", allowedDateInfo.minutes[0], allowedDateInfo.minutes[allowedDateInfo.minutes.length-1], contextData.errors);
      isRangedInt(req.body.month, "month", 0, 11, contextData.errors);

      if (!validator.isURL(req.body.image) || (req.body.image.match(/\.(gif|png)$/i) === null )){
        contextData.errors.push('Your image should be a png or gif');
      }

    if (contextData.errors.length === 0) {
      collection.insert( newEvent , function (err, doc) {
          if (err) {
              // If it failed, return error
              res.status(404).send("There was a problem adding the information to the database.");
          }
          else {
              // And forward to success page
              console.log(newEvent);
              res.redirect('/events/' + newEvent.id);
          }
      });
    } else {
      res.render('create-event', contextData);
    }
  };










function eventDetail (req, res) {

  var db = req.db;
  var collection = db.get('eventlist');
  collection.findOne({'id':parseInt(req.params.id)},{},function(e,docs){
      var currentTime = new Date();

      if (docs) {
        res.render('event-detail', {
            "event" : docs,
            "time": currentTime
        });
      } else {
        res.status(404).send('404 Error: No such event');
      };

  });

}


// what is called when someone rsvps to an event
function rsvp (request, response){
  // takes the incoming params id and identifies the event user wants to RSVP to and then stores in variable "ev"
  var ev = events.getById(parseInt(request.params.id));
  // if it doesn't find the event, it says 'No such event'
  if (ev === null) {
    response.status(404).send('404 Error: No such event');
  }

  if (validator.isEmail(request.body.email) && request.body.email.toLowerCase().indexOf('@yale.edu') !== -1){
    ev.attending.push(request.body.email);
    // Need to add a directive to save the event here.
    response.redirect('/events/' + ev.id);
  } else{
    var contextData = {errors: [], event: ev};
    if(request.body.email.toLowerCase().indexOf('harvard') !== -1){
      contextData.errors.push('Harvard not allowed!');
    }else{
      contextData.errors.push('Invalid email! Are you a Yale student?');
    }
    response.render('event-detail', contextData);
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
};
