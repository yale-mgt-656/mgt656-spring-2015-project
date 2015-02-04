'use strict';

// Import our express and our configuration
var express = require('express');
var configure = require('./config.js');

// Import our controllers
var indexControllers = require('./controllers/index.js');
var aboutControllers = require('./controllers/about.js');
var eventControllers = require('./controllers/events.js');
var weeklystatusreportControllers = require('./controllers/weekly-status-report.js');


// Create our express app
var app = express();

// Configure it
configure(app);

// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/about', aboutControllers.about);
app.get('/events', eventControllers.listEvents);
app.get('/events/new', eventControllers.newEvent);
<<<<<<< HEAD
app.get('/api/events', eventControllers.api);
=======
app.get('/weekly-status-report', weeklystatusreportControllers.weeklystatusreport);
>>>>>>> e17d08ba188a81e7cb384464271f541415ac8dcc
app.post('/events/new', eventControllers.saveEvent);

module.exports = app;