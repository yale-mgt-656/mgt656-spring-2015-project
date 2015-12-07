'use strict';
var events = require('../models/events');
/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    title: 'SOM class of 2016 & 2017 Party Central',
    tagline: 'Lets get ready to party.',
    events: events.futures()
  };
  response.render('index.html', contextData);
}

/**
 * Controllers that renders variations of index (home) page.
 */
function var1 (request, response) {
  var contextData = {
    title: 'SOM class of 2016 & 2017 Party Central',
    tagline: 'Lets get ready to party.',
    events: events.futures()
  };
  response.render('index1.html', contextData);
}


module.exports = {
  index: index,
  var1: var1
};
