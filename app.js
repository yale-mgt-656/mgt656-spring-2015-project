'use strict';

// Import our express and our configuration
var express = require('express');
var configure = require('./config.js');

// var bootstrap = require('bootstrap');

// Import our controllers
var indexControllers = require('./controllers/index.js');
var aboutControllers = require('./controllers/about.js');
var eventControllers = require('./controllers/events.js');
var apiControllers = require('./controllers/api.js');

// Create our express app
var app = express();

// Configure it
configure(app);

// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/about', aboutControllers.about);
app.get('/events', eventControllers.listEvents);
app.get('/events/new', eventControllers.newEvent);
app.post('/events/new', eventControllers.saveEvent);
app.get('/events/:id', eventControllers.eventDetail);
app.get('/api', apiControllers.viewApi);
app.get('/api/events', apiControllers.listEventsJSON);
app.get('/api/events/:id', apiControllers.eventDetailJSON);

// action for RSVPing
app.post('/events/:id/rsvp', eventControllers.rsvp);

app.get('/sprints', function (req, res) {
  var contextData = {};
  res.render('reports/sprint-reports.html', contextData)
});

module.exports = app;
