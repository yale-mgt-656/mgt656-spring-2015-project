'use strict';

/**
 * Controller that renders our about page.
 */
function blog (request, response) {
  var contextData = {};
  response.render('blog.html', contextData);
}

module.exports = {
  blog: blog
};