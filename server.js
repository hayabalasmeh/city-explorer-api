
'use strict'

require('dotenv').config();

const express = require('express');

const server = express(); // to inherit all the methods and prop from express framework

// const weatherData = require('./data/weather.json');
const axios = require('axios');

const cors = require('cors');
server.use(cors());

const PORT= 3030;

//localhost:3030/weather?lon=151.21&lat=-33.87&searchQuery=Sydney
//{ "description": "Low of 17.1, high of 23.6 with broken clouds","date": "2021-03-31"
  //},

  class Forcast {
    constructor(date,description){
        this.date= date;
        this.description= description;
    }
}

server.get('/',(req,resp)=>{
    resp.send('hi')
})

server.get('/weather',requestingWeatherData);

async function requestingWeatherData (request,response){
    let latParameter = request.query.lat;
    let lonParameter = request.query.lon;
    // let cityName= request.query.searchQuery;
   
    //localhost:3030/weather?lat=31.9515694&lon=35.9239625
    let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${latParameter}&lon=${lonParameter}&key=2f07e04c5dac4d6eaaa9e327211a7409`;

    
         axios.get(weatherURL).then(axiosRes =>{
        
           const cityWeather= axiosRes.data.data.map(item =>{
                let description= `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
           return new Forcast(item.valid_date,description) ;
           
           })
       
        response.send(cityWeather);
    })
    .catch(error=>{
        response.send(`error is ${error}`);
       } )
}
        
     


server.get('*',(req,resp)=>{
    resp.send('error not found')
})

server.listen(PORT,()=>{
 console.log('hi')
})
