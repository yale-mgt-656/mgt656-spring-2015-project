'use strict';

/**
 * Controller that renders our about page.
 */
function about (request, response) {
  var contextData = {
    id: 'logo',
    image: 'http://www.brandrepublicinsight.com/Media/Default/images/dark-logo.png'
    
  };
  response.render('about.html', contextData);
}

module.exports = {
  about: about
};