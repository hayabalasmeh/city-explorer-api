
const express = require('express');

const server = express(); // to inherit all the methods and prop from express framework

const weatherData = require('./data/weather.json');

const cors = require('cors');
server.use(cors());

const PORT= 3030;

//localhost:3030/weather?lon=151.21&lat=-33.87&searchQuery=Sydney
//{ "description": "Low of 17.1, high of 23.6 with broken clouds","date": "2021-03-31"
  //},
server.get('/',(req,resp)=>{
    resp.send('hi')
})
class Forcast {
    constructor(date,description){
        this.date= date;
        this.description= description;
    }
}
server.get('/weather',(request,response)=>{
    let latParameter = request.query.lat;
    let lonParameter = request.query.lon;
    let cityName= request.query.searchQuery;
    let cityWeather=[];
         weatherData.data.forEach((item)=>{
             let description= `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
        let newForcast= new Forcast(item.valid_date,description) ;
        cityWeather.push(newForcast);
        })
       
   
   
    response.send(cityWeather);
})

server.get('*',(req,resp)=>{
    resp.send('error not found')
})

server.listen(PORT,()=>{
 console.log('hi')
})
