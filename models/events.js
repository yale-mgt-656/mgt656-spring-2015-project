'use strict';

/**
 * An Array of all the events
 */
var allEvents = [
  {
    id: 0,
    title: 'SOM House Party',
    // Note that JavaScript months are zero-indexed,
    // so, month zero is January. This is Jan 17th
    // 2013 at 4:30pm local time.r
    date:   new Date(2016, 0, 17, 16, 30, 0),
    image: 'http://i.imgur.com/pXjrQ.gif',
    location: 'Kyle \'s house',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu']
  },
  {
    id: 1,
    title: 'BBQ party for hackers and nerds',
    date:   new Date(2015, 8, 1, 19, 0, 0),
    image: 'http://i.imgur.com/7pe2k.gif',
    location: 'Miles\' house',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu']
  },
  {
    id: 2,
    title: 'BBQ for managers',
    date:   new Date(2015, 9, 20, 18, 0, 0),
    image: 'http://i.imgur.com/CJLrRqh.gif',
    location: 'Barry Nalebuff\'s house',
    attending: ['kim.kardashian@yale.edu'],
  },
  {
    id: 3,
    title: 'Watching Paint Dry!',
    date:   new Date(2015, 11, 2, 13, 0, 0),
    image: 'http://i.imgur.com/CJLrRqh.gif',
    location: 'Jeff\'s House',
    attending: ['kim.kardashian@yale.edu'],
  },
  {
    id: 4,
    title: 'Cooking lessons for the busy business student',
    date:   new Date(2015, 8, 2, 19, 0, 0),
    image: 'http://i.imgur.com/02KT9.gif',
    location: 'Yale Farm',
    attending: ['homer.simpson@yale.edu'],
  },
  {
    id: 5,
    title: 'Let\'s Cook!',
    date:   new Date(2016, 3, 6, 19, 30, 0),
    image: 'http://i.imgur.com/1gSB77J.gif',
    location: 'Jesse\'s Winnebago',
    attending: ['theone.whoknocks@yale.edu'],
  },
  {
    id: 6,
    title: 'Stop Drop and Roll Party',
    date:   new Date(2016, 5, 13, 19, 30, 0),
    image: 'http://i.imgur.com/1gSB77J.gif',
    location: 'Jesse\'s Winnebago',
    attending: ['theone.whoknocks@yale.edu'],
  },
  {
    id: 7,
    title: 'Desert Boogie',
    date:   new Date(2016, 9, 17, 19, 30, 0),
    image: 'http://i.imgur.com/1gSB77J.gif',
    location: 'Jesse\'s Winnebago',
    attending: ['theone.whoknocks@yale.edu'],
  },
  {
    id: 8,
    title: 'Everybody Get Low!',
    date:   new Date(2016, 5, 17, 19, 30, 0),
    image: 'http://i.imgur.com/1gSB77J.gif',
    location: 'Jesse\'s Winnebago',
    attending: ['theone.whoknocks@yale.edu'],
  },
  {
    id: 9,
    title: 'Blinded by the Light Party',
    date:   new Date(2016, 7, 8, 19, 30, 0),
    image: 'http://i.imgur.com/1gSB77J.gif',
    location: 'Jesse\'s Winnebago',
    attending: ['theone.whoknocks@yale.edu'],
  }
];


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

function getMaxId() {
  var max = -1;
  for (var i = 0; i < allEvents.length; i++) {
    if (allEvents[i].id > max){
      max = allEvents[i].id;
    }
  }
  return max;
}

module.exports = exports = {
  all: allEvents,
  getById: getById,
  getMaxId: getMaxId
};