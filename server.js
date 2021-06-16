
'use strict'

require('dotenv').config();

const express = require('express');

const server = express(); // to inherit all the methods and prop from express framework

// const weatherData = require('./data/weather.json');
const axios = require('axios');

const cors = require('cors');
server.use(cors());

 const PORT= process.env.PORT;
 const weather=require('./weather');
 const movie=require('./movie')
 
//localhost:3030/weather?lon=151.21&lat=-33.87&searchQuery=Sydney
//{ "description": "Low of 17.1, high of 23.6 with broken clouds","date": "2021-03-31"
  //},




server.get('/',(req,resp)=>{
    resp.send('hi')
})

server.get('/weather',weather);
server.get('/movies',movie);




   
     


server.get('*',(req,resp)=>{
    resp.send('error not found')
})

server.listen(PORT,()=>{
 console.log('hi')
})
