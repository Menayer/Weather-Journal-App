// Setup empty JS object to act as endpoint for all routes
let projectData = {};

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
const port = 3300;
const server = app.listen(port, callBackFunction);

function callBackFunction(){
    console.log("Server is Running");
}

// Routes Section

// Get Route
app.get('/', sendData);

function sendData (request, response) {
  response.send(projectData);
};

const data = [];

// Post Route
app.post('/', getWeather)

function getWeather (req,res){

    data.push(req.body);
};