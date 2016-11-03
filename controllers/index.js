'use strict';

var events  = require('../models/events');

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'XCG Events',
    'tagline': 'Not campus groups'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
