
'use strict'
require('dotenv').config();
const axios = require('axios');
module.exports = MovieDisplay;
const key2 = process.env.MOVIE_API_KEY;
let memory={};


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

function MovieDisplay(request,response){
   
    let cityName= request.query.searchQuery;
   
    //localhost:3030/weather?lat=31.9515694&lon=35.9239625
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${key2}&query=${cityName}`;

    if(memory[cityName] !==undefined){
        console.log('from memory')
        response.send(memory[cityName])

    }
    else{
         axios.get(movieURL).then(axiosRes =>{
        
           const moviesList= axiosRes.data.results.map(item =>{
                let imageUrl= `https://image.tmdb.org/t/p/w500${item.poster_path}`;
           return new Movie (item.title,item.overview,item.vote_average,item.vote_count,imageUrl,item.popularity,item.release_date) ;
           
           })
       memory[cityName]=moviesList;
       console.log('from api')
        response.send(moviesList);
    })
    .catch(error=>{
        response.send(`error is ${error}`);
       } )
    }
}     