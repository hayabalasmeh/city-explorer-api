'use strict'
require('dotenv').config();
const axios = require('axios');
module.exports = Weather;
const key1 = process.env.WEATHER_API_KEY;

class Forcast {
    constructor(date,description){
        this.date= date;
        this.description= description;
    }
}

function Weather (request,response){
    let latParameter = request.query.lat;
    let lonParameter = request.query.lon;
    // let cityName= request.query.searchQuery;
   
    //localhost:3030/weather?lat=31.9515694&lon=35.9239625
    let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${latParameter}&lon=${lonParameter}&key=${key1}`;

    
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