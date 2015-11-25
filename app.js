'use strict';

// Import our express and our configuration
var express = require('express');
var configure = require('./config.js');
var router = express.Router();

// var bootstrap = require('bootstrap');

// DB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/halfmountain');
var jade = require('jade');


// Import our controllers
var indexControllers = require('./controllers/index.js');
var aboutControllers = require('./controllers/about.js');
var eventControllers = require('./controllers/events.js');
var apiControllers = require('./controllers/api.js');

// Create our express app
var app = express();


// Configure it
configure(app);

// Make our db accessible to our router aka adding middleware to all paths
app.use(function(req,res,next){
    req.db = db;
    next();
});

// app.use('/', routes);
// app.use('/events', events);


// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/about', aboutControllers.about);

app.get('/events', eventControllers.listEvents);

app.get('/eventlist', function(req, res) {
    var db = req.db;
    var collection = db.get('eventlist');
    collection.find({},{},function(e,docs){
        var currentTime = new Date();
        res.render('event', {
            "events" : docs,
            "time": currentTime
        });
    });
});


app.get('/events/new', eventControllers.newEvent);

app.post('/events/new', eventControllers.saveEvent);
// app.post('/events/new', eventControllers.toDatabase);


app.get('/events/:id', eventControllers.eventDetail);
app.get('/api', apiControllers.viewApi);
app.get('/api/events', apiControllers.listEventsJSON);

// action for RSVPing
app.post('/events/:id/rsvp', eventControllers.rsvp);

app.get('/sprints', function (req, res) {
  var contextData = {};
  res.render('reports/sprint-reports.html', contextData)
});



module.exports = app;
