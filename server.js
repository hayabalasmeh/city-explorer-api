
'use strict'

require('dotenv').config();

const express = require('express');

const server = express(); // to inherit all the methods and prop from express framework

// const weatherData = require('./data/weather.json');
const axios = require('axios');

const cors = require('cors');
server.use(cors());

 const PORT= process.env.PORT;
 const key1 = process.env.WEATHER_API_KEY;
 const key2 = process.env.MOVIE_API_KEY;
//localhost:3030/weather?lon=151.21&lat=-33.87&searchQuery=Sydney
//{ "description": "Low of 17.1, high of 23.6 with broken clouds","date": "2021-03-31"
  //},

  class Forcast {
    constructor(date,description){
        this.date= date;
        this.description= description;
    }
}
class Movie {
    constructor(title,overview,averageVotes,totalVotes,link,popularity,realeasedDate){
        this.title= title;
        this.overview= overview;
        this.averageVotes=averageVotes;
        this.totalVotes=totalVotes;
        this.link=link;
        this.popularity= popularity;
        this.realeasedDate=realeasedDate;
    }
}

server.get('/',(req,resp)=>{
    resp.send('hi')
})

server.get('/weather',requestingWeatherData);
server.get('/movies',requestingMovieName);

async function requestingWeatherData (request,response){
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


 function requestingMovieName (request,response){
   
    let cityName= request.query.searchQuery;
   
    //localhost:3030/weather?lat=31.9515694&lon=35.9239625
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${key2}&query=${cityName}`;

    
         axios.get(movieURL).then(axiosRes =>{
        
           const moviesList= axiosRes.data.results.map(item =>{
                let imageUrl= `https://image.tmdb.org/t/p/w500${item.poster_path}`;
           return new Movie (item.title,item.overview,item.vote_average,item.vote_count,imageUrl,item.popularity,item.release_date) ;
           
           })
       
        response.send(moviesList);
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
