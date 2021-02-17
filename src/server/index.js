const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
// const mockAPIResponse = require('./mockAPI.js')


const app = express()
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
  console.log('Example app listening on port 8081!')
})


app.get('/', function(req, res) {
  res.sendFile('dist/index.html')
})

// app.get('/test', function(req, res) {
//   res.send(mockAPIResponse)
// })


app.post('/process-text', function(req, res) {

  // meaningcloud api structure
  // let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=APIKEYHERE&lang=en&txt=hello&model=general';

  // Establishing API Info
  const apiKey = process.env.API_KEY; // meaningcloud API key hidden
  const articleURL = req.body.articleURL;



  // Building Fetch URL Using Base Url then adding Params with API Key and URL Info
  const baseURL = 'https://api.meaningcloud.com/sentiment-2.1' //meaningcloud base request url
  const allParams = `?key=${apiKey}&lang=en&model=general&url=${articleURL}` // adding API Params
  const fetchURL = baseURL + allParams; // builing full Fetch Url

  console.log(fetchURL); // logging Fetch URL

  fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    res.send({
      irony: data.irony,
      agreement: data.agreement,
      subjectivity: data.subjectivity,
      confidence: data.confidence,
      status: data.status.msg,
    })
  });
})








app.post('/process-open', function(req, res) {

  // meaningcloud api structure
  // let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=APIKEYHERE&lang=en&txt=hello&model=general';

  // Establishing API Info
  const apiKey = process.env.API_KEY; // meaningcloud API key hidden
  const articleURL = req.body.articleURL;



  // Building Fetch URL Using Base Url then adding Params with API Key and URL Info
  const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=' //meaningcloud base request url
  const allParams = `,us&units=imperial&appid=${apiKey}&url=${articleURL}` // adding API Params
  const fetchURL = baseURL + allParams; // builing full Fetch Url

  console.log(fetchURL); // logging Fetch URL

  fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    res.send({
      date: data.date,
      temp_desc:  data.temp_desc,
      name: data.name,
      temp: data.temp,
      temp_max: data.temp_max,
      content: data.content,
    })
  });
})




















// GET Weather Data
app.get('/allWeatherData', sendWeatherData);

function sendWeatherData(req, res) {
  res.send(projectData);
};


// POST Weather Data
const data = [];
app.post('/addWeather', addWeather);

function addWeather(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp_desc'] = req.body.temp_desc;
  projectData['name'] = req.body.name;
  projectData['temp'] = req.body.temp;
  projectData['feels_like'] = req.body.feels_like;
  projectData['temp_max'] = req.body.temp_max;
  projectData['content'] = req.body.content;
  res.send(projectData);
}
