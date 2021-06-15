# Express Servers

## Overview

Today we will build our own custom Express server in Node.js. We will server our front end static files and dive more deeply into the WRRC.

## Daily Plan

- Announcements
  - 1:1 meetings
  - Feedback review
- Review code challenges
- Code review of lab assignment
- Warm-up exercise
- Express Servers
- Code Demo
- Lab Preview
- Introduction of today's code challenge topic, split, join, slice, splice

## Week 1 Feedback Review

### The Good/Most Helpful

- Code review
- Each other
  - I definitely notice this class does a great job working together & supporting each other

### The Mixed

- Code challenges
  - some love them, some find them to be a lot of work
  - they're VERY helpful towards 401 and future interviews

### The Not-So-Good/Least Helpful

- Day 1 lecture/demo were not close enough to lab, so day 1 lab was hard
  - Thank you for letting me know! Adding that into the instructor notes about day 1's lecture, and I'll teach it differently next time.
- Portfolio assignment got a lot of negative feedback
  - something personal that was so templated
    - fair
  - seemed less useful than other labs
    - I disagree with this one. Reading through starter code & being able to modify it is a skill worth developing.
  - But even if that's a good skill, it would still be possible to separate out the starter-code part from a portfolio assignment; I've made an issue to discuss w/ the other instructors.

## Learning Objectives

As a result of completing Class 7 of Code 301, students will be able to:

- Describe and Define:
  - Async
  - Server
  - ReST
  - Express
    - Application Middleware
    - Route Middleware
  - cors
  - env variables
  - WRRC
- Hook up a front end React application with a back end server
- Create an Express server from scratch

## Notes

1. What is a server?

1. What is express?

1. What is cors?

1. Why do we need a server?

1. Basic express server
  ```javaScript
  'use strict';
  
  // this library lets us access our .env file
  require('dotenv').config();

  // express is a server library
  const express = require('express');

  // initalizes the express library
  const app = express();

  // library that determines who is allowed to speak to our server
  const cors = require('cors');

  // this settting says that everyone is allowed to speak to our server
  app.use(cors());

  // we are getting the port variable from the .env file. 
  const PORT = process.env.PORT;

  // this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
  app.get('/', (request, response) => {
    response.send('hello from the home route');
  });

  // this turns the server on to the port that you specifed in your .env file
  app.listen(PORT, () => console.log(`listening on ${PORT}`));
  ```

1. You can set up a route that your front-end can hit. Your server will return information on that route:
  ```javaScript
  // FRONT-END
  await axios.get('http://localhost:3001/cats');
  
  // BACK-END
  app.get('/cats', (request, response) => {
    response.send('cats are the best');
  });
  ```

1. You can also send information from the front-end to the back-end as a query. 
  - queries live in the URL after the question mark: `http://localhost:3000/?city=seattle`
  - to send that query to the back-end via axios, I would do this:
  ```javaScript
  //FRONT-END
  await axios.get('http://localhost:3001/city', {params: { city: 'seattle' }});

  // BACK-END
  app.get('city', (request, response) => {
    const city = reqeust.query.city;
    response.send(`you sent the city of ${city}`)
  });
  ```
