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
    // 2013 at 4:30pm local time.
    date:   new Date(2016, 0, 17, 16, 30, 0),
    image: 'http://i.imgur.com/pXjrQ.gif',
    location: 'Kyle \'s House',
    address: '126 Jensen St, New Haven CT 06511',
    details: 'The Yale School of Management is hosting its annual end of semester house party. Come for the fun, stay for the music and dance the night away before facing those stressful exams. Free booze and food all-night!',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu']
  },
  {
    id: 1,
    title: 'Pizza Party for Hackers and Nerds',
    date:   new Date(2015, 8, 1, 19, 0, 0),
    image: 'http://i.imgur.com/7pe2k.gif',
    location: 'Payne Whitney Gymnasium',
    address: '70 Tower Pkwy, New Haven, CT 06511',
    details: 'Want to be apart of the next big technological reveolution? If yes, come to the Payne Whitney Gym with your laptop, creative mind and a determination to work with like-minded tech geeks collaborating and working hard. Don\'t worry, we\'ll feed you with the best Pizza in the country.',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu']
  },
  {
    id: 2,
    title: 'BBQ for Managers',
    date:   new Date(2015, 9, 20, 18, 0, 0),
    image: 'http://i.imgur.com/CJLrRqh.gif',
    location: 'Barry Nalebuff\'s House',
    address: '86 Barry Ave, New Haven CT 06511',
    details: 'We know you have a lot on your plate and the constant oversight makes you tired. Well here\'s your chance to take a break, eat some BBQ Chicken with your colleagues, drink a few beers and get down if you feel like.',
    attending: ['kim.kardashian@yale.edu'],
  },
  {
    id: 4,
    title: 'Healthy Cooking: Lessons for Busy Bodies',
    date:   new Date(2014, 8, 2, 19, 0, 0),
    image: 'http://i.imgur.com/02KT9.gif',
    location: 'Yale Farm',
    address: '345 Edwards St, New Haven, CT 06511',
    details: 'Are you a busy student? Not getting enough nutrients from your current diet or just want to do more of your own cooking at home? Well come and practice with us at the Farm as we show you how to prepare quick healthy meals.',
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