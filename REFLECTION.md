# Week 1 reflection
 
1. What is the difference between building a UI imperatively (plain DOM code) and declaratively 
(React)?

In plain DOM code, we must manually find an element and update the text. Example,
count = count + 1
total.a = count

With React, we describe how React should handles the updates. Example,
setTotal(count + 1)
 
2. Why must a component name start with a capital letter?
To distinguish between React components and HTML elements
 
3. What does a fragment <>...</> do, and why not just use a <div>?
Fragment groups elements together without adding box to the page, while <div> add a box that might affect the layout
 
4. Name one benefit of splitting the UI into small components.
Easier to maintain the code since each component handles specific parts.