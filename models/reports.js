'use strict';

/**
 * An Array of all the events
 */
var allReports = [
  {
    id: 4,
    teammembers: [
      {name: "Cheng Zhao", email: "cheng.zhao@yale.edu"},
      {name: "David Mowat", email: "david.mowat@yale.edu"},
      {name: "Nilofer Ahmed", email: "nilofer.ahmed@yale.edu"},
      {name: "Stefan Bauer", email: "stefan.bauer@yale.edu"}
      ],
    date:   new Date(2015, 10, 16, 23,59, 59),
    sections:[
      {
        title: "Application Description and Purpose",
        paragraphs: ["The Wandering Wood Code team is creating an event management platform that will allow users to create and RSVP for upcoming events. Our goal is to create a more intuitive and user friendly version of of event management platforms than those currently on the market."],
        //image: "http://i.imgur.com/pXjrQ.gif"
      },
      {
        title: "Coding Team Composition and Approach",
        paragraphs: [
          "The code .team is comprised of four second year MBA students at Yale SOM who have been immersed in coding for the semester. Cheng Zhao has extensive coding expertise and is leading our technical efforts with Nilofer Ahmed, Stefan Bauer and David Mowat contributing to the project. The Team is utilizing scrum methodology to ensure we deploy changes quickly and collaborate effectively.",
          "The team is using waffle.io as our kanban board to track progress and manage our backlog. Current backlog with completed stories listed:"
        ],
        link: "https://waffle.io/wandering-wood/mgt656-spring-2015-project/join"
      },
      {
        paragraphs: ["The platform will be deployed on Heroku - a current work-in-progress version of the website can be viewed at:"],
        link: "https://mgt-656-wandering-wood.herokuapp.com/"
      },
      {
        title: "Meetings Held and Outcomes",
        paragraphs: 
        [
          "By the conclusion of our last sprint, we essentially finished all of the story points that we had to complete. While we were happy with our progress and encouraged by the fact that we passed most of the tests, our site was quite ugly. We collectively agreed that the major focus of this sprint would be to improve the site aesthetics. Once we divided up the work (see method of point estimation paragraph), we agreed to all work separately and email one another when roadblocks arose, in a similar way to our previous sprint. We also agreed that each person was free to use his or her own discretion when deciding on what design looked the best. In this instance, we risked not making our site have a similar theme. During the same meeting, Cheng gave David, Stefan, and Nilofer a brief tutorial on how to change the formatting of a page in Cloud9 and used the AirBnB website as an example of how the CSS functions on that website.",
          "On Monday during class, we met one last time to ask each other what we thought of each page (ex: question regarding opinions about font size and color) and Cheng answered some lingering questions (such as helping Stefan commit his branch). During this time we discussed possible ways to improve our workflow, but didn’t come up with any substantial ideas."
        ]
      },
      {
        title: "Method of Point Estimation",
        paragraphs: 
        [
          "As soon we decided that this sprint would be dedicated to improving the site aesthetics, we debated playing another game of planning poker to see how many points each formatting task would be. We quickly realized that we not only were unsure of how long each task would take, but that going into very granular detail about each task (Ie: font size for home page) would be overly cumbersome and too specific. Instead, we decided that since Nilofer, Stefan, and David had somewhat similar programming capabilities, each of them would try to work on the aesthetics of one particular page, and that improving each page would be about 25 points of work. Cheng, would continue to act as the scrum master, and answer any questions that arose throughout the sprint."
        ]
      },
      {
        title: "What is Currently Functioning",
        paragraphs: 
        [
          "Since this sprint was primarily dedicated to formatting and improving site aesthetics, the functionality of the site did not improve during this sprint. This was our goal going into the sprint, and collectively, we were all happy and impressed with how much better our site looks.",
          "For instance, our homepage went from a bland, unorganized page to a page that seemed like it would be linked to a good time."
        ]
      },
      {
        title: "Work Load",
        paragraphs: 
        [
          "Given that Stefan, Dave, and Nilofer all worked on each of their own pages, the workload was split up evenly between the 3 of them, and Cheng helped when needed. Cheng gave Dave, Stefan, and Nilofer a 30 minute tutorial at the beginning of the sprint and answered questions throughout the week. Overall, each person felt that the workload was adequate."
        ]
      },
      {
        title: "Completed Stories During Sprint",
        paragraphs: 
        [
        ]
      },
      {
        title: "Burndown Chart",
        paragraphs: 
        [
        ],
        image: "http://i.imgur.com/pXjrQ.gif"
      },
      {
        title: "Backlog",
        paragraphs: 
        [
        ]
      },
      {
        title: "Moving Sprint Reports to Version Control",
        paragraphs: 
        [
          "Instead of using Google Docs to write Sprint Reports as before, this Sprint we have started doing Sprint Reports in HTML and save in Git version control as part of the app. Reports will be accessible at https://mgt-656-wandering-wood.herokuapp.com/reports/:id, where \":id\" is the report number. This practice will continue from now on. There is no plan to move previous reports to Git at this time."
        ]
      }
      ]
  }
];


/**
 * Returns the first event that has a particular id.
 */
function getById (id) {
  for (var i = allReports.length - 1; i >= 0; i--) {
    if (id === allReports[i].id){
      return allReports[i];
    }
  }
  return null;
}


module.exports = exports = {
  all: allReports,
  getById: getById
};