'use strict';

// Import our express and our configuration
var express = require('express');
var configure = require('./config.js');

// Import our controllers
var indexControllers = require('./controllers/index.js');
var aboutControllers = require('./controllers/about.js');
var eventControllers = require('./controllers/events.js');
var sprintControllers = require('./controllers/sprint-report4.js');//change this


// Create our express app
var app = express();

// Configure it
configure(app);

// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/donate', indexControllers.donatecontrol);
app.get('/about', aboutControllers.about);
app.get('/sprint-report4', sprintControllers.sprintreport);//change this
app.get('/sprint-report5', sprintControllers.sprintreport5);
app.get('/sprint-report6', sprintControllers.sprintreport6);
app.get('/final-report', sprintControllers.finalreport);
app.get('/events', eventControllers.listEvents);
app.get('/events', eventControllers.listEvents);
app.post('/events/new', eventControllers.saveEvent);
app.get('/events/new', eventControllers.newEvent);
app.get('/events/:id([0-9]+)', eventControllers.eventDetail);
app.get('/api/events', eventControllers.api);
app.post('/events/:id([0-9]+)', eventControllers.rsvp);
module.exports = app;