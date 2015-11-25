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

  collection.findOne({'id':parseInt(req.params.id)},{},function(e,docs){
      var currentTime = new Date();

      if (docs) {
        return docs
      } else {
        return null;
      };

  });
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
