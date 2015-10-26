'use strict';

/**
 * An Array of all the events
 */
var allEvents = [
  {
    id: 0,
    title: 'SOM Concert Festival',
    // Note that JavaScript months are zero-indexed,
    // so, month zero is January. This is Jan 17th
    // 2013 at 4:30pm local time.
    date:   new Date(2016, 0, 17, 16, 30, 0),
    image: '.gif',
    location: 'Kyle \'s house',
    attending: ['kyle.jensen@yale.edu', 'kanye.west@yale.edu', 'kim.kardashion@yale.edu', 'arctic.monkeys@yale.edu', 'disclosure@yale.edu']
  },
  {
    id: 1,
    title: 'BBQ party for hipsters and nerds',
    date:   new Date(2015, 8, 1, 19, 0, 0),
    image: '.jpg',
    location: 'Miles\' house',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu', 'nicole.clark@yale.edu', 'cameron.rout@yale.edu', 'tugce.erten@yale.edu']
  },
  {
    id: 2,
    title: 'Poetry Reading',
    date:   new Date(2015, 9, 20, 18, 0, 0),
    image: '.gif',
    location: 'Barry Nalebuff\'s house',
    attending: ['robert.frost@yale.edu', 'walt.whitman@yale.edu', 'emily.dickinson@yale.edu', 'patricia.lockwood@yale.edu'],
  },
    {
    id: 3,
    title: 'Office Hours feat. Donuts',
    date:   new Date(2015, 1, 23, 10, 0, 0),
    image: 'gif',
    location: 'The Bunker',
    attending: ['kyle.jensen@yale.edu', 'jennifer.mcfadden@yale.edu']
  },
  {
    id: 4,
    title: 'Cooking lessons for the busy business student',
    date:   new Date(2014, 8, 2, 19, 0, 0),
    image: 'http://i.imgur.com/02KT9.gif',
    location: 'Yale Farm',
    attending: ['homer.simpson@yale.edu'],
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

module.exports = exports = {
  all: allEvents,
  getById: getById
};