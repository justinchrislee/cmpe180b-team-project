# Justin Lee - Weekly Scrum
## Sprint #1 (9/30 - 10/06)

### What tasks did I work on/complete?

From the first meeting, it was agreed that we would separate into two groups, that being the frontend team and backend team. Anna and I would be the frontend team, while Arselan and Poojitha were the backend team. From there, my responsibility was to think about potential tech stacks that I could suggest to the team. For the frontend team, I had suggested React, which Anna and I agreed to use. For the backend, my suggestion was to use Node because I have some experience with that particular technology. However, Arselan and Poojitha decided to use java as they both have experience with java. 


### What am I planning to work on next?
My next task was to put some thought into a needed functionality of the database, which would be searching for listings. Another task of mine was to begin researching how to deploy the frontend on AWS EC2 Cluster. 


### What tasks are blocked waiting on another team member?
None



## Sprint #2 (10/7 - 10/13)
 
### What tasks did I work on/complete?
Created a small entity relation diagram that shows the entities, relationships, and attributes for the search functionality of the database. 


### What am I planning to work on next?
Begin collaborating with Anna on creating home page and begin integrating API for the home page.



### What tasks are blocked waiting on another team member?
None


## Sprint #3 (10/14 - 10/20)

### What tasks did I work on/complete?
Anna and I began working on the home page. 


### What am I planning to work on next?
The next task was to determine what kind of functionality we wanted for our application in order to have a minimal viable product. 



### What tasks are blocked waiting on another team member?
Backend team was not able to get the APIs, therefore, Anna and I couldn’t link the frontend to the backend. 



<h2>Sprint #4 (10/21 - 10/26)</h2><br>

<h3>What tasks did I work on/complete?</h3><br>
<ul>
<li> 
Wrote some requirements for a minimal viable product with Anna. 
</li><br>
</ul>

<h3>What am I planning to work on next?</h3><br>
<ul>
<li> 
Start integrating logic for the home page regarding rendering the listings. 
</li><br>
</ul>


<h3>What tasks are blocked waiting on another team member?</h3><br>
<ul>
<li> 
Backend team was not able to get the APIs, therefore, Anna and I couldn’t link the frontend to the backend. 
</li><br>
</ul>


<h2>Sprint #5 (10/28 - 11/02)</h2><br>

<h3>What tasks did I work on/complete?</h3><br>
<ul>
<li> 
Developed some of the logic for rendering listings on the home page, using fake data. Also created a navbar using react bootstrap. 
</li><br>
</ul>

<h3>What am I planning to work on next?</h3><br>
<ul>
<li> 
Start developing logic for logged in and logged out views for various components. Also create a search bar with filtering functionality.
</li><br>
</ul>


<h3>What tasks are blocked waiting on another team member?</h3><br>
<ul>
<li> 
APIs were returning either HTML or text, not JSON, which was the agreed upon format for the API. Therefore, Anna and I were not able to link the frontend to the backend. 
</li><br>
</ul>


<h2>Sprint #6 (11/04 - 11/10)</h2><br>
 
<h3>What tasks did I work on/complete?</h3><br>
<ul>
<li> 
Added a filter search bar, with a drop down menu that has options for what to filter the search by. Also, added some rendering logic for nav bar depending on if the user is logged in or logged out. 
</li><br>
</ul>

<h3>What am I planning to work on next?</h3><br>
<ul>
<li> 
I am planning to work on developing some more logic for the home page with data from the API, and rendering a card for each listing.
</li><br>
</ul>


<h3>What tasks are blocked waiting on another team member?</h3><br>
<ul>
<li> 
Aside from Login, which Anna integrated, no other APIs were functional at the time, so I was not able to link other frontend components to the backend. 
</li><br>
</ul>


<h2>Sprint #7 (11/11 - 11/17)</h2><br>

<h3>What tasks did I work on/complete?</h3><br>
<ul>
<li> 
Added some rendering logic to render a card for each listing. (Currently still don’t have data from the backend) 
</li><br>
</ul>

<h3>What am I planning to work on next?</h3><br>
<ul>
<li> 
Display listings on the home page with actual data, implement logic for showing favorited listings, and displaying applications that a user has either sent or received, depending on the type of user. 
</li><br>
</ul>


<h3>What tasks are blocked waiting on another team member?</h3><br>
<ul>
<li> 
Still don’t have any other APIs from the backend team, therefore, couldn’t display actual listings from the database.
</li><br>
</ul>


<h2>Sprint #8 (11/18 - 11/24)</h2><br>

<h3>What tasks did I work on/complete?</h3><br>
<ul>
<li> 
Using mock data, implemented some rendering logic for displaying favorited listings and applications sent or received by a user (depending on the user type).  
</li><br>
</ul>

<h3>What am I planning to work on next?</h3><br>
<ul>
<li> 
Integrate the template that Anna found for the home page, as well as develop logic for how to display the sidebar from the template (depending on the type of user)
</li><br>
</ul>


<h3>What tasks are blocked waiting on another team member?</h3><br>
<ul>
<li> 
Backend team decided to switch from Java to Python Flask. Therefore, they have begun the process of redoing the APIs. Therefore, currently can’t link any frontend components to the backend. 
</li><br>
</ul>


<h2>Sprint #9 (11/25 - 12/1)</h2><br>

<h3>What tasks did I work on/complete?</h3><br>
<ul>
<li> 
Began integrating template for the home page. 
</li><br>
</ul>

<h3>What am I planning to work on next?</h3><br>
<ul>
<li> 
Begin linking frontend to backend, develop logic for how to display the sidebar depending on the user, and begin linking other pages with the API. 
</li><br>
</ul>


<h3>What tasks are blocked waiting on another team member?</h3><br>
<ul>
<li> 
Sessions were not working, therefore, the frontend team couldn’t link any frontend components that required sign in.
</li><br>
</ul>



<h2>Sprint #10 (12/2 - 12/5)</h2><br>

<h3>What tasks did I work on/complete?</h3><br>
<ul>
<li> 
Completed integrating these APIs to the frontend:<br>
<ul>
 <li>Display all listings on home page</li>
 <li>Display applications list for landlord</li>
 <li>Display applications list for seller</li>
 <li>View application for landlord listing</li>
 <li>View application for seller listing</li>
 <li>Approve/reject application for landlord listing</li>
 <li>Approve/reject application for seller listing</li>
 <li>Create new sale listing</li>
 <li>Create new rental listing</li>
 <li>Edit sale listing</li>
 <li>Edit rental listing</li>
 <li>Delete sale listing</li>
 <li>Delete rental listing</li>
 <li>Filter search that can filter listings based on various categories</li>
 <li>Favorite sales listings and display all favorite sales listings</li>
 <li>Favorite rental listings and display all favorite rental listings</li>
 <li>Remove favorite listings</li>
</ul>
</li><br>
</ul>

<h3>What am I planning to work on next?</h3><br>
<ul>
<li> 
N/A - End of Project
</li><br>
</ul>


<h3>What tasks are blocked waiting on another team member?</h3><br>
<ul>
<li> 
None
</li><br>
</ul>


<h2>XP Core Value Demonstrated Throughout the Project</h2><br>

<ul>
<li> 
I believe this team demonstrated the XP core value of courage throughout the entire project. The reason why I chose courage is because this team as a whole faced countless challenges and setbacks, yet as a unit, chose to persevere through times where the tasks at hand seemed extremely daunting. For instance, the backend team had originally chosen Java to implement the backend. However, a transition had to be made from Java to Python, which in essence, meant that they had to reimplement everything that they had in Python. In addition to that, they had to implement several more APIs on the fly, in which various APIs posed complex challenges. On the other hand, the front end team also had its fair share of times where the project felt somewhat overwhelming. In particular, the hardest challenge that the frontend team faced was having to implement countless APIs in the last week. In prior weeks, due to several challenges that the backend team encountered, most of the APIs weren’t available quite yet. Therefore, it almost felt as if the walls were slowly caving in. However, none of us chose to back down from what seemed like an impossible task and worked through it. There were also other times where maybe a team member temporarily couldn’t be as involved in the group project for personal reasons, and the rest of the team would do an admirable job of stepping up. In general, this team exhibited great courage throughout the entire project. I also personally believe it may have been the most important factor in our success. 
</li><br>
</ul>
