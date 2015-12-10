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
        ],
        image: "/images/frontpage.png"
      },
      {
        title: "Moved Sprint Reports to Version Control",
        paragraphs: 
        [
          "Instead of using Google Docs to write Sprint Reports as before, this Sprint we have started doing Sprint Reports in HTML and save in Git version control as part of the app. Reports will be accessible at https://mgt-656-wandering-wood.herokuapp.com/reports/:id, where \":id\" is the report number. This practice will continue from now on. There is no plan to move previous reports to Git at this time."
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
        list: 
        [
          "Formatted home page",
          "Added new photos for each team member", 
          "Added logo to header so it appears on every page", 
          "Only display future events on the homepage",
          "Updated browser tab info",
          "Event detail page corrected to have the the right ids and classes for each field",
          "Revised new event page, all tests passed",
          "Created version-controlled html sprint report",
          "Added sprint report to the app"
        ]
      },
      {
        title: "Burndown Chart",
        paragraphs: 
        ["The majority of work completed was finished early in the sprint following our planning meeting and assistance from Cheng. The uptick in story points at day 5 of the burndown chart is related to us recognizing the need to move our sprint reports to html format. This had not been included in the original sprint plan, but was deemed necessary based on review of recent feedback from management on our previous sprint reports."
        ],
        image: "/images/bd4.png"
      },
      {
        title: "Backlog for Next Sprint",
        list: 
        [
          "Format event detail page",
          "Clean up headers and footers on all pages",
          "Format About page",
          "Format event creation form",
          "Format Events page",
          "Gain understanding of Google analytics to analyze traffic to site",
          "Set up donate button on Events Detail page",
          "Conduct A/B testing to maximize donation"
        ]
      }
    ]
  },
  {
    id: 5,
    teammembers: [
      {name: "Cheng Zhao", email: "cheng.zhao@yale.edu"},
      {name: "David Mowat", email: "david.mowat@yale.edu"},
      {name: "Nilofer Ahmed", email: "nilofer.ahmed@yale.edu"},
      {name: "Stefan Bauer", email: "stefan.bauer@yale.edu"}
    ],
    date:   new Date(2015, 10, 30, 23,59, 59),
    sections:[
      {
        title: "Application Description and Purpose",
        paragraphs: ["The Wandering Wood Code team is creating an event management platform that will allow users to create and RSVP for upcoming events. Our goal is to create a more intuitive and user friendly version of of event management platforms than those currently on the market."],
      },
      {
        title: "Coding Team Composition and Approach",
        paragraphs: ["The code .team is comprised of four second year MBA students at Yale SOM who have been immersed in coding for the semester. Cheng Zhao has extensive coding expertise and is leading our technical efforts with Nilofer Ahmed, Stefan Bauer and David Mowat contributing to the project. The Team is utilizing scrum methodology to ensure we deploy changes quickly and collaborate effectively.",
        "The team is using waffle.io as our kanban board to track progress and manage our backlog.",
        "Current backlog with completed stories listed: "],
        link: "https://waffle.io/wandering-wood/mgt656-spring-2015-project/join"
      },
      {
        paragraphs: ["The platform will be deployed on Heroku - a current work-in-progress version of the website can be viewed at: "],
        link: "https://mgt-656-wandering-wood.herokuapp.com/"
      },
      {
        title: "Meetings Held and Outcomes",
        paragraphs: ["At the onset of the Sprint, we met to discuss the upcoming Sprint and possible ways in which we could complete tasks in a manner that fit our individual coding abilities and time constraints. Since we were done with most of the stories that were initially outlined at the beginning of the project, we had a certain degree of latitude in deciding which stories to focus on in this sprint. Ultimately, we decided to focus our efforts on adding the Donate button to the Events Details page and the Google Analytics capabilities to the site. We estimated that each story would require a heavy amount of work and both of the stories required more effort than any one of our team members could exert. We debated on splitting the team into two groups of two, and having each group work on one story, but ultimately decided on meeting together twice throughout the week to work on both of the stories as one group. ",
        "For the first meeting, we decided to just focus on adding the Donate Button to the Events Details page. We all discussed how we thought we should go about completing this task, and Cheng facilitated the conversation. We used a main screen in a breakout room and slowly but surely, made progress and eventually were successful in adding the link to the Events Details page.",
        "The second meeting proved to be more troublesome, as we were unsure about how to insert the Google analytics functionality into our site. In a similar manner to the first meeting, we all discussed/googled how to insert the functions into our code and Cheng facilitated the conversation. While there were some roadblocks along the way, we ultimately were successful in adding the analytics function."]
      },
      {
        title: "Method of Point Estimation",
        paragraphs: ["We initially decided that we wanted to focus on adding the Donate Button and Google Analytics function. We played a quick game of planning poker to see if we thought that this was too lofty of a goal or if it would be too easy and should therefore target more stories. The results of our planning poker were that adding the Donate Button would be 30 points and that the Google Analytics would be 50 points (we should note that none of us had any previous history with implementing Google Analytics, so it was a relatively wide dispersion of estimates)."]
      },
      {
        title: "What is currently functioning",
        paragraphs: ["Our site is currently functioning from a technical standpoint where it meets all critical functionality tests. We have also added some formatting elements to the homepage and created a logo to make the page more customized, but we have continued work to do on the look and feel of the site. We also have Google Analytics now functioning on the site. This enables us to analyze traffic coming to the site and will also enable us to see where the donations to events come from. This information will be valuable as as better understanding of what schools the majority of our target customers are affiliated with will enable more effective and targeted marketing. "],
        image: "/images/ga5.png"
      },
      {
        paragraphs: ["Next steps include using Analytics to view how our traffic breaks down across varying segments and the associated click-through rate to donation as well as some preliminary A/B testing (using the word “RSVP” to potentially drive click-through rate as well as verifying whether the words “donate” or “support” result in statistically significant differences in conversions)."]
      },
      {
        title: "Work Load",
        paragraphs: ["Our workload remains manageable in large part to a strong sprint planning process. Despite not having a high degree of experience with Google Analytics on the team, we were able to complete our targeted stories in the time we had allotted as a team.  We continue to find that working together as a group remains the most effective way of tackling larger and more unfamiliar tasks. Our team continues to collaborate well with each other and Cheng’s experience has been extremely valuable in guiding our the technical components of each our tasks."]
      },
      {
        title: "Completed Stories During Sprint",
        list: [
          "Gain understanding of Google analytics to analyze traffic to site",
          "Set up donate button on Events Detail page",
          "Set up Google analytics on project app",
          "Started AB testing for home page: RSVP vs original"]
      },
      {
        title: "Burndown Chart",
        paragraphs: ["The Burndown chart below reflects the fact that our Sprint was the length of only 5 days (we wanted to finish the sprint before the break) and that all of the work for the Sprint was completed in two meetings."],
        image: "/images/bd5.png"
      },
      {
        title: "Current Backlog",
        list: [
          "Format event detail page",
          "Clean up headers and footers on all pages",
          "Format About page",
          "Format event creation form",
          "Format Events page",
          "Migrate data from being memory-stored to being database-stored stored",
          "Set up AB testing for event detail page",
          "Analyze traffic breakdown across segments and flow from landing to donation",
          "Optimize app based on GA results"]
      }
    ]
  },
  {
    id: 6,
    teammembers: [
      {name: "Cheng Zhao", email: "cheng.zhao@yale.edu"},
      {name: "David Mowat", email: "david.mowat@yale.edu"},
      {name: "Nilofer Ahmed", email: "nilofer.ahmed@yale.edu"},
      {name: "Stefan Bauer", email: "stefan.bauer@yale.edu"}
      ],
    date:   new Date(2015, 11, 7, 23,59, 59),
    sections:[
      {
        title: "Application Description and Purpose",
        paragraphs: ["The Wandering Wood Code team is creating an event management platform that will allow users to create and RSVP for upcoming events. Our goal is to create a more intuitive and user friendly version of of event management platforms than those currently on the market."],
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
          "At the onset of the Sprint, we met to discuss the upcoming Sprint which would be the last major sprint of this project. Given that the project will be wrapping up, we all decided that clearing our backlog of stories was critically important for this sprint. The major story categories that remain are: finalizing formatting elements, migrating to a database, and further analysis of our Google Analytics data. We have learned that our team is most effective during collective working sessions so decided to continue that approach. We planned to meet on Friday afternoon to work jointly and then to finalize our respective tasks over the weekend.",
          "In our Friday meeting, Nilofer took ownership of CSS formatting elements, Cheng and Stefan worked together on database migration and David worked on assessing the Google Analytics data. This meeting was very productive. Our team has established good working norms and continues to be able to complete tasks effectively together."
        ]
      },
      {
        title: "Method of Point Estimation",
        paragraphs: 
        [
          "We played a quick game of planning poker to estimate the points for each task this week. The results of our planning poker were that database migration would be 60 points, outstanding formatting stories would be 45 points and that the Google Analytics would be 25 points."
        ]
      },
      {
        title: "What is Currently Functioning",
        paragraphs: 
        [
          "Our site is currently functioning from a technical standpoint where it meets all critical functionality tests. We have also added some formatting elements to the homepage and created a logo to make the page more customized, but we have continued work to do on the look and feel of the site. We also have Google Analytics now functioning on the site. This enables us to analyze traffic coming to the site and will also enable us to see where the donations to events come from. This information will be valuable as as better understanding of what schools the majority of our target customers are affiliated with will enable more effective and targeted marketing.",
          "From an aesthetics perspective, we have begun making use of Bootstrap more actively as a front end framework. While our site meets functional requirements and passes all the tests listed, its layout and design are sub-optimal at this time. To improve the website layout, we have begun using Bootstrap’s advanced grid system on all pages, with pre-sized rows and columns to house our content. This has greatly improved the viewability of the site on all devices, particularly mobile, as content is now better organized with consistent alignment. We are currently experiencing some challenges with consistent typography and style across the website - this will be added to the backlog for the next sprint and completed using a selection of related fonts and colour palettes."
        ]
      },
      {
        title: "Business Analytics",
        paragraphs: 
        [
          "We have been using Google Analytics to track traffic and to assess effectiveness of generating donations. Thus far our traffic breaks down as follows: "
        ],
        image: "/images/pie6.png"
      },
      {
        paragraphs: 
        [
          "We have not been able to analyze donation generation as the site is not yet registering any donor traffic. We have spoken with Kyle Jensen and his team as they were making changes to the testing code. We plan to attend office hours this week to determine why the test traffic is not registering any donations on our site. Addressing this issue will enable us to perform the remaining business analytics tasks.",
          "Screenshot of Google Analytics Customer Acquisition Overview:"
        ],
        image: "/images/ga6.png"
      },
      {
        title: "Work Load",
        paragraphs: 
        [
          "WOur workload on this sprint was ambitious as the project deadline is fast approaching. The database migration exercise used up a lot of our team’s bandwidth. In spite of strained resources, we were able to make progress towards finalizing formatting. With the traffic code not registering any donations on our site yet, we were not able to do all business analytics as we had previously hoped to complete this sprint. This will leave more workload than hoped for the final days of the project, but our team will be able to share the tasks and get the job done."
        ]
      },
      {
        title: "Completed Stories During Sprint",
        list: 
        [
          "Database migration",
          "Utilize Bootstrap’s grid system on About page", 
          "Gain further understanding of Google analytics to analyze traffic to site", 
          "Set up donate button on Events Detail page"
        ]
      },
      {
        title: "Burndown Chart",
        paragraphs: 
        ["The Burndown chart below reflects the fact that all originally planned stories (i.e. completion of business  analytics) were not completed during this sprint."
        ],
        image: "/images/bd6.png"
      },
      {
        title: "Backlog for Next Sprint",
        list: 
        [
          "Update for Bootstrap grid system on all pages",
          "Clean up headers and footers on all pages",
          "Update stylesheet.css for consistent formatting across site",
          "Analyze traffic breakdown across segments and flow from landing to donation",
          "AB Test Homepage",
          "AB Test Event Detail page"
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