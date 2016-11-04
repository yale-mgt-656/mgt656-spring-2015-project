'use strict';


//var $ = require('jquery');
/*var http = require('http');

var options = {
    host: 'jquery.com',
    port: 80,
    path: '/'
};
*/
function sprint(id) {
    var e = document.getElementById(id);        
    if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    //$('sprint3').toggle();
}

module.exports = {
  'sprint': sprint
};