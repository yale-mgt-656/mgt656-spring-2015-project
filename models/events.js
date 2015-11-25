'use strict';

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/halfmountain');
var collection = db.get('eventlist');
var events = collection.find();
var allEvents = []

events.each(function(x){allEvents.push(x)});

/**
 * Returns the first event that has a particular id.
 */
function getById (id) {
  for (var i = allEvents.length - 1; i >= 0; i--) {
    if (id === allEvents[i].id){
      return allEvents[i];
    }
  }
  return null;
}


function getMaxId () {
  var maxId = null;
  for (var i = allEvents.length - 1; i >= 0; i--) {
    if (maxId === null || maxId < allEvents[i].id){
      maxId = allEvents[i].id;
    }
  }
  return maxId;
}


module.exports = exports = {
  all: allEvents,
  getById: getById,
  getMaxId: getMaxId,
};
