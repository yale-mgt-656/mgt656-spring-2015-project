'use strict';

var events = require('../models/events');

/**
 * Controller that renders our index (home) page.
 */
 
 var words = ['#hipster',
'hipster',
];
function randomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function index (request, response) {
  var exp = 0.5;
  var r = Math.random();
  if (r<=exp) {
    response.redirect('/original');
  }
  else {
    response.redirect('/experiment');
  }
}

function experiment (request, response) {
  var now = new Date();
  var contextData = {
    'title': 'MGT656',
    'tagline': 'The world\'s best Eventbrite clone',
    'events': [],
    'tagword': randomWord(words),
  };
  for (var i=0; i < events.all.length; i++){
    var event = events.all[i];
    if(event.date > now) {
      contextData.events.push(event);
    }
  }
  response.render('index_rsvp.html', contextData);
}

function original (req, res) {
  var now = new Date();
  var contextData = {
    'title': 'MGT656',
    'tagline': 'The world\'s best Eventbrite clone',
    'events': [],
    'tagword': randomWord(words),
  };
  for (var i=0; i < events.all.length; i++){
    var event = events.all[i];
    if(event.date > now) {
      contextData.events.push(event);
    }
  }
  res.render('index.html', contextData);
}

module.exports = {
  'index': index,
  'original': original,
  'experiment': experiment
};
