// Setup empty JS object to act as endpoint for all routes
projectData = {};
const data = [];

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3310;

app.listen(port, callBackFunction);

function callBackFunction(){
    console.log(`Server is Running : http://localhost:${port}`);
}

// Routes Section

// Get Route
app.get('/GetWeather', sendData);

function sendData (request, response) {
  response.send(projectData);
};

// Post Route
app.post('/PostWeather', add )

function add (req,res){
    data.push(req.body);
};