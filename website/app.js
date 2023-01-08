/* Open weather API Key and URL */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=c53a1aac5d03808910b79fd36db6a826';

// Create a new date instance  & initiate Leaf map
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
let map = L.map('map');

// Select UI Elements
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const warning = document.getElementById('warning');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

// On submit
document.getElementById('generate').addEventListener('click',onSubmit);

// On Submit callback function
function onSubmit(e){
    e.preventDefault();
    check();
};

// Check zip code input value
function check(){
    
    if (zipCode.value === '' || zipCode.value == null){
        warning.innerHTML = 'Zip Code value cannot be empty!';
        warning.style.color = '#FF0000';
    }
    else{
        warning.innerHTML = '';
        getWeatherData(zipCode.value,baseURL, apiKey).then((result)=>{checkApi(result)});
    }
}

// Check Api return
function checkApi(ApiResult){
    if(ApiResult.cod != 200){
        warning.innerHTML = 'Zip Code is not right!.';
        warning.style.color = '#FF0000';
    }
    else{
        warning.innerHTML = ''
        postData('/add',ApiResult).then(()=>RetrieveData('/get'));
    }
}

// Fetch Weather data
const getWeatherData = async (zip,url,key)=>{

    // Combine the base url With zip code and key and call the API
    const res = await fetch(url+zip+key);

    try {
        const data = await res.json();
        data.feel = feelings.value;
        data.date = newDate;
        return data;
        
    } catch (error) {
        console.log('error','The error: ' +error);
    }
}
 
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),        
  });

    try {

      const newData = await response.json();
      return newData;

    }catch(error) {

    console.log("error", error);

    }
}

// Retrieve Data & Update the UI card
const RetrieveData =async (url)=>{
    const req = await fetch(url);
    try{
        const allData = await req.json();
        // Write updated data to DOM elements
        document.getElementById('city').innerHTML = `Weather in <em>${allData.city} , ${allData.country}</em>`;
        document.getElementById('temp').innerHTML = `Temperature:  <em>${Math.round(convert(allData.temp)) } &deg;</em>`;
        document.getElementById('description').innerHTML =`Weather Status: <em>${allData.weather}</em>`;
        document.getElementById('wind').innerHTML =`Wind Speed: <em>${allData.wind}</em>`;
        document.getElementById('date').innerHTML =`Date of Today: <em>${allData.date}</em>`;
        document.getElementById('content').innerHTML =`Content: <em>${allData.feel}</em>`;
        // Draw the location map
        DrawMap(allData.lat,allData.lon);
    }catch(error){
        console.log("error", error);
    }
}

// Map Draw function
function DrawMap (lat,lon){
        // Clear old map
        map.off();
        // Set Map View
        map.setView([lat,lon], 13);
        // Creating a Layer object
        let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        // Adding layer to the map
        map.addLayer(layer);
}

// Celsius Converter function
function convert(tempDegree){
    return (tempDegree-32)/18; 
}



