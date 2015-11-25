'use strict';

/**
 * Controller that renders our donate page.
 */
function donate (request, response) {
  var contextData = {};
  response.render('donate.html', contextData);
}

module.exports = {
  donate: donate
};

function thankyou (request, response) {
  var contextData = {};
  response.render('thankyou.html', contextData);
}

module.exports = {
  donate: donate,
  thankyou: thankyou 
};