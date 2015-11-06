'use strict';

// Import our express and our configuration
var express = require('express');
var configure = require('./config.js');

// var bootstrap = require('bootstrap');

// Import our controllers
var indexControllers = require('./controllers/index.js');
var aboutControllers = require('./controllers/about.js');
var eventControllers = require('./controllers/events.js');

// Import our models
var Event     = require('./models/events');

// Create our express app
var app = express();

// Configure it
configure(app);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/events')

    // get all the events (accessed at GET http://localhost:8080/api/events)

    .get(function(req, res) {
        res.json(Event.all)
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/about', aboutControllers.about);
app.get('/events', eventControllers.listEvents);
app.get('/events/:id', eventControllers.eventDetail);
app.get('/events/new', eventControllers.newEvent);
app.post('/events/new', eventControllers.saveEvent);

app.get('/sprints', function (req, res) {
  var contextData = {};
  res.render('reports/sprint-reports.html', contextData)
});




module.exports = app;
