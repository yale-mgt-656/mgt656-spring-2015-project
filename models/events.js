'use strict';

var events = require('../models/events');
var validator = require('validator');

/**
 * An Array of all the events
 */
var allEvents = [
  {
    id: 0,
    title: 'Maria Said loves to party',
    // Note that JavaScript months are zero-indexed,
    // so, month zero is January. This is Jan 17th
    // 2013 at 4:30pm local time.
    date:   new Date(2017, 0, 17, 16, 30, 0),
    image: 'http://i.imgur.com/pXjrQ.gif',
    location: 'Kyle \'s house',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu']
  },
  {
    id: 1,
    title: 'Jon gets a new haircut',
    date:   new Date(2015, 8, 1, 19, 0, 0),
    image: 'http://i.imgur.com/7pe2k.gif',
    location: 'Miles\' house',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu']
  },
  {
    id: 2,
    title: 'Deem makes everyone breakfast',
    date:   new Date(2015, 9, 20, 18, 0, 0),
    image: 'http://i.imgur.com/CJLrRqh.gif',
    location: 'Barry Nalebuff\'s house',
    attending: ['kim.kardashian@yale.edu'],
  },
  {
    id: 4,
    title: 'Vish has a British bash',
    date:   new Date(2014, 8, 2, 19, 0, 0),
    image: 'http://i.imgur.com/02KT9.gif',
    location: 'Yale Farm',
    attending: ['homer.simpson@yale.edu'],
  }
];


/**
 * Returns the first event that has a particular id.
 */
function getById (id) {
  for (var i = allEvents.length - 1; i >= 0; i--) {
    if (id === allEvents[i].id){
      return allEvents[i];
    }
  }
  return null;
}

module.exports = exports = {
  all: allEvents,
  getById: getById
};

function newEvent(request,response) {
  var contextData = {};
  response.render('create-event.html', contextData);
}

function saveEvent(request, response){
  var contextData = {errors: []};
  
  if (validator.islength(request.body.title, 5, 50) == false) {
    contextData.errors.push('Your title should be between 5 and 50 letters');
  }


if (contextData.errors.length == 0) {
  var newEvent = {
    title: request.body.title,
    location: request.body.location,
    image: request.body.image,
    date: new Date(),
    attending: [],
  };
  events.all.push(newEvent);
  response.redirect('/events');
}else{
  response.render('create-event.html', contextData);
}
}
