'use strict';

// Import our express and our configuration
var express = require('express');
var configure = require('./config.js');
var router = express.Router();

// var bootstrap = require('bootstrap');

// DB
var mongo = require('mongodb');
var monk = require('monk');
var jade = require('jade');




// Import our controllers
var indexControllers = require('./controllers/index.js');
var aboutControllers = require('./controllers/about.js');
var eventControllers = require('./controllers/events.js');
var apiControllers = require('./controllers/api.js');
var donationControllers = require('./controllers/donation.js');

// Create our express app
var app = express();


// Configure it
configure(app);


// if (app.get('env') === 'development') {
//   var db = monk("mongodb://localhost:27017/halfmountain")
// }
// if (app.get('env') === 'production') {
//   var db = monk(process.env.MONGOLAB_URI);
// }


// Make our db accessible to our router aka adding middleware to all paths
// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });

// app.use('/', routes);
// app.use('/events', events);


// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/about', aboutControllers.about);
app.get('/events', eventControllers.listEvents);
app.get('/events/new', eventControllers.newEvent);

app.post('/events/new', eventControllers.saveEvent);
// app.post('/events/new', eventControllers.toDatabase);


app.get('/events/:id', eventControllers.eventDetail);
app.get('/api', apiControllers.viewApi);
app.get('/api/events', apiControllers.listEventsJSON);
app.get('/api/events/:id', apiControllers.eventDetailJSON);
app.get('/donation', donationControllers.donation);

// action for RSVPing
app.post('/events/:id/rsvp', eventControllers.rsvp);

app.get('/sprints', function (req, res) {
  var contextData = {};
  res.render('reports/sprint-reports', contextData)
});



module.exports = app;
