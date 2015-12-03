'use strict';

var mongo = require('mongodb');
var monk = require('monk');
// var mongoUri = process.env.MONGOLAB_URI;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  var db = monk("mongodb://localhost:27017/halfmountain")
}
if (process.env.NODE_ENV === 'production') {
  var db = monk(process.env.MONGOLAB_URI);
}

if (process.env.NODE_ENV === 'testing') {
  var db = monk("mongodb://localhost:27017/halfmountain");
}

var collection = db.get('eventlist');
var events = collection.find();
var allEvents = [];

events.each(function(x){allEvents.push(x)});

/**
 * Returns the first event that has a particular id.
 */
function getById (id) {
   return collection.findOne({id: id});
  //  console.log('hello');
   //
  //  collection.findOne({id:id}).on('success', function(doc) {
  //    console.log('yo');
  //    return doc;
   //
  //  })

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
  collection: collection
};
