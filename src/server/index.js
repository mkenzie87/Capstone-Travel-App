const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
// const mockAPIResponse = require('./mockAPI.js')

// Setup empty JS object to act as endpoint for all routes
let projectData = {};
console.log(projectData);

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

// GET Weather Data
app.get('/allWeatherData', sendWeatherData);

function sendWeatherData(req, res) {
  res.send(projectData);
};


// POST Weather Data
app.post('/addWeather', addWeather);

function addWeather(req, res) {
  projectData['web_image'] = req.body.web_image;
  projectData['large_image'] = req.body.large_image;

  res.send(projectData);
}
