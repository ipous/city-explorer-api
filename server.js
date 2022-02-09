'use strict'

// require in our libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
//bring in our weather dummy data
const weather = require('./data/weather.json');
const { response } = require('express');

//App to use...
const app = express();
app.use(cors());

//set the port variable
const PORT = process.env.PORT || 3002;

//testing the home route to make sure the server is running correctly
app.get('/', (request, response) => {
    response.send('hello from home route')
});

//Create an API endpoint of `/weather` that processes a `GET` request that contains `lat`, `lon`, and `searchQuery` information.
app.get('/weather', (request, response) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;

    //Use the .find() method to discover which city the `lat`, `lon` and `searchQuery` information belong to. 
    const city = weather.find(cityObj => cityObj.city_name.toLowerCase() === searchQuery.toLowerCase()); 

    try{
        //Using each data point from the static data of the city that the user searched, create an array of `Forecast` objects, one for each day. 
        const weatherArray = city.data.map(day => new Forecast(day)); 

        //Send the full array back to the client who requested data from the `weather` endpoint.
        response.status(200).send(weatherArray);

    } catch(error) {
//If the user did not search for one of the three cities that we have information about (Seattle, Paris, or Amman), return an error.
    console.log(error);
    response.status(500).send('city not found')
    }

   })

   //Create a class for `Foreclass`, that has properties of `date` and `description`.
   function Forecast(day) {
       this.day = day.valid_date
       this.description = day.weather.description
   }

//tells the express app which port to listen on
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
