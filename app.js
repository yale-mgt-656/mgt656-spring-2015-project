'use strict';

// Import our express and our configuration
var express = require('express');
var configure = require('./config.js');

// Import our controllers
var indexControllers = require('./controllers/index.js');
var indexControllersAB = require('./controllers/index-AB.js');
var aboutControllers = require('./controllers/about.js');
var eventControllers = require('./controllers/events.js');
var statusControllers = require('./controllers/status.js');


// Create our express app
var app = express();

// Configure it
configure(app);

// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/index_AB', indexControllersAB.index);
app.get('/about', aboutControllers.about);
app.get('/events', eventControllers.listEvents);
app.get('/events/new', eventControllers.newEvent);
app.get('/api/events', eventControllers.api);
app.get('/status', statusControllers.status);
app.get('/events/:id', eventControllers.eventDetail);

app.post('/events/new', eventControllers.saveEvent);
app.post('/events/:id', eventControllers.rsvp);

module.exports = app;