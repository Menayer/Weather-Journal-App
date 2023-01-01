/* Global Variables */

const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ',us&appid=c53a1aac5d03808910b79fd36db6a826&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Select UI Elements

const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');

const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

// On submit

document.getElementById('generate').addEventListener('click',onSubmit);

// On Submit callback function

function onSubmit(e){
    e.preventDefault();
    getWeatherData(zipCode.value, contentElement.value,baseURL, apiKey);
};

// Fetch Weather data

const getWeatherData = async (zip,content,url,key)=>{

    // Combine the base url With zip code and key and call the API
    const res = await fetch(url+zip+key);

    try {
        const data = await res.json();
        console.log(data);
        
    } catch (error) {
        console.log('error',error);
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

// Update UI

const updateUI =async ()=>{
    const req = await fetch('/')
}