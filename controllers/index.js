'use strict';

var events = require('../models/events');
var express = require('express');
var router = express.Router();


/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var currentTime = new Date();
  var contextData = {
    'title': 'Half Mountain',
    'tagline': 'Check out our upcoming events!',
    'events': events.all.sort(function(a, b) {
        return b.date - a.date;
      }).filter(function(x) {
        return x.date > currentTime;
      }),
  };
  response.render('index', contextData);
}

module.exports = {
  index: index
};
