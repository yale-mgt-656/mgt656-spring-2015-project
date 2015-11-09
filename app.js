'use strict';

// Import our express and our configuration
var express = require('express');
var configure = require('./config.js');

// Import our controllers
var indexControllers = require('./controllers/index.js');
var aboutControllers = require('./controllers/about.js');
var eventControllers = require('./controllers/events.js');
var reportsControllers = require('./controllers/reports.js');


// Create our express app
var app = express();

// Configure it
configure(app);

// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/about', aboutControllers.about);
app.get('/reports', reportsControllers.reports);
app.get('/reports/1', reportsControllers.scrum1);
app.get('/reports/2', reportsControllers.scrum2);
app.get('/reports/3', reportsControllers.scrum3);
app.get('/reports/4', reportsControllers.scrum4);
app.get('/reports/5', reportsControllers.scrum5);
app.get('/reports/6', reportsControllers.scrum6);
app.get('/events', eventControllers.listEvents);
app.get('/api/events', eventControllers.api);
app.get('/events/new', eventControllers.newEvent);
app.post('/events/new', eventControllers.saveEvent);

module.exports = app;