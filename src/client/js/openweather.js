/* Global Variables */

// Personal API Key for OpenWeatherMap API
// api url = api.openweathermap.org/data/2.5/forecast?zip={zip code},{country code}&appid={API key}
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&units=imperial&appid=6c413c6e3c5f59807918f3a330cbc154';

// //Get the date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
let = newDate = mm + '/' + dd + '/' + yyyy;

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const getZip = document.getElementById('zip').value;
  const newContent = document.getElementById('feelings').value;
  const entry = document.getElementById('entry-wrapper').style.display = "block";

  getWeather(baseURL, getZip, apiKey) // this will trigger the getWeather function
    // New Syntax!
    .then(function(data) {
      // Add data
      console.log(data);
      postData('/addWeather', {
        date: newDate,
        name: data.name,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_max: data.main.temp_max,
        temp_desc: data.weather[0].description,
        content: newContent
      })
    })
    .then(function(newData) {

      updateUI()
    })
}

const getWeather = async (baseURL, getZip, apiKey) => {

  const res = await fetch(baseURL + getZip + apiKey)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};


const updateUI = async () => {
  const request = await fetch('/allWeatherData');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('location').innerHTML = allData.name;
    document.getElementById('temp_desc').innerHTML = allData.temp_desc;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('feels-like').innerHTML = allData.feels_like;
    document.getElementById('max-temp').innerHTML = allData.temp_max;
    document.getElementById('content').innerHTML = allData.content;

  } catch (error) {
    console.log("error", error);
  }
}

export { performAction }
