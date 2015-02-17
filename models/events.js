'use strict';

/**
 * An Array of all the events
 */
var allEvents = [
  {
    id: 0,
    title: 'Replicator Dinner Party',
    // Note that JavaScript months are zero-indexed,
    // so, month zero is January. This is Jan 17th
    // 2013 at 4:30pm local time.
    date:   new Date(2016, 0, 17, 16, 30, 0),
    image: 'http://imgsrc.hubblesite.org/hu/db/images/hs-2006-01-a-640_wallpaper.jpg',
    location: 'Ten Forward',
    attending: ['jeanluc.picard@yale.edu', 'beverly.crusher@yale.edu']
  },
  {
    id: 1,
    title: 'Holodeck Trip to Risa',
    date:   new Date(2015, 8, 1, 19, 0, 0),
    image: 'http://imgsrc.hubblesite.org/hu/db/images/hs-1995-01-a-640_wallpaper.jpg',
    location: 'The Holodeck',
    attending: ['will.riker@yale.edu', 'deanna.troi@yale.edu']
  },
  {
    id: 2,
    title: 'Dangerous Away Mission',
    date:   new Date(2015, 9, 20, 18, 0, 0),
    image: 'http://imgsrc.hubblesite.org/hu/db/images/hs-2005-15-a-640_wallpaper.jpg',
    location: 'Uninhabited Class M Planet',
    attending: ['random.crewman@yale.edu', 'georgi.laforge@yale.edu', 'data@yale.edu']
  },
  {
    id: 3,
    title: 'Party with Q',
    date:   new Date(2014, 8, 2, 19, 0, 0),
    image: 'http://imgsrc.hubblesite.org/hu/db/images/hs-2009-25-f-640_wallpaper.jpg',
    location: 'The Continuum',
    attending: ['q@yale.edu', 'jeanluc.picard@yale.edu'],
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