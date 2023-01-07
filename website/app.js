/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=c53a1aac5d03808910b79fd36db6a826";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

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
    check();
};

// Check zip code input value
function check(){
    
    if (zipCode.value === "" || zipCode.value == null){
        alert("Zip Code value cannot be empty!");
    }
    else{
        
        getWeatherData(zipCode.value,baseURL, apiKey).then((result)=>{checkApi(result)});
        
    }
}
// Check Api return

function checkApi(ApiResult){
    if(ApiResult.cod != 200){
        alert("Wrong Zip Code");
    }
    else{
        postData("/add",ApiResult).then(()=>updateUI("/get"));
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
        console.log('error',"The error: " +error);
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

const updateUI =async (url)=>{
    const req = await fetch(url);
   

    try{
        const allData = await req.json();
        // Write updated data to DOM elements
        document.getElementById('weather__entry__temp').innerHTML = Math.round(allData.temp)+ 'degrees';
        document.getElementById('weather__entry__content').innerHTML = allData.feel;
        document.getElementById("weather__entry__date").innerHTML =allData.date;
    }catch(error){
        console.log("error", error);
    }
}