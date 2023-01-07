// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 9910;

app.listen(port, callBackFunction);

function callBackFunction(){
    console.log(`Server is Running : http://localhost:${port}`);
}

// Routes Section

// Get Route
app.get('/get', sendData);

function sendData (request, response) {

  console.log("I'm at get request");
  response.send(projectData);
  

};

// Post Route
app.post('/add', getWeather)

function getWeather (request,response){
    projectData ={
      lon : request.body.coord.lon,
      lat : request.body.coord.lat,
      weather : request.body.weather[0].main,
      temp : request.body.main.temp,
      wind : request.body.wind.speed,
      country : request.body.sys.country,
      city : request.body.name,
      feel: request.body.feel,
      date: request.body.date
    }
    response.send(projectData);
    console.log(projectData);
};