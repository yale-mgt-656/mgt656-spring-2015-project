'use strict';

/**
 * Controller that renders our reports page.
 */
function reports (request, response) {
  var contextData = {};
  response.render('reports.html', contextData);
}

function scrum1 (request, response) {
  var contextData = {};
  response.render('scrum1.html', contextData);
}

function scrum2 (request, response) {
  var contextData = {};
  response.render('scrum2.html', contextData);
}

function scrum3 (request, response) {
  var contextData = {};
  response.render('scrum3.html', contextData);
}

function scrum4 (request, response) {
  var contextData = {};
  response.render('scrum4.html', contextData);
}

function scrum5 (request, response) {
  var contextData = {};
  response.render('scrum5.html', contextData);
}

function scrum6 (request, response) {
  var contextData = {};
  response.render('scrum6.html', contextData);
}

module.exports = {
  'scrum1' : scrum1,
  'scrum2' : scrum2,
  'scrum3' : scrum3,
  'scrum4' : scrum4,
  'scrum5' : scrum5,
  'scrum6' : scrum6,
  'reports' : reports
};

