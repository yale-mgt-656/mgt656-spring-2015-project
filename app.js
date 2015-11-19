'use strict';

// Import our express and our configuration
var express = require('express');
var configure = require('./config.js');

// Import our controllers
var indexControllers = require('./controllers/index.js');
var aboutControllers = require('./controllers/about.js');
var eventControllers = require('./controllers/events.js');
var sprintreportControllers = require('./controllers/sprint-report.js');
var donateControllers = require('./controllers/donate.js');

// Create our express app
var app = express();

// Configure it
configure(app);

// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/about', aboutControllers.about);
app.get('/events', eventControllers.listEvents);
app.get('/events/new', eventControllers.newEvent);
app.get('/events/:id([0-9]+)', eventControllers.eventDetail);
app.post('/events/:id([0-9]+)', eventControllers.rsvp);
app.post('/events/new', eventControllers.saveEvent);
app.get('/api/events', eventControllers.api);
app.get('/sprint-report-4', sprintreportControllers.sprintreport);
app.get('/donate', donateControllers.donate);
app.post('/donate', donateControllers.thankyou);

module.exports = app;