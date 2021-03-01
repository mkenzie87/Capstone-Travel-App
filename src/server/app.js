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


app.get('/', function(req, res) {
  res.status(200).res.sendFile('dist/index.html')
})

// GET Weather Data
app.get('/allWeatherData', sendWeatherData);

function sendWeatherData(req, res) {
  res.send(projectData);
};



app.post('/postData',function (req,res){
  projectData['currentTemp'] = req.body.currentTemp;
  projectData['weatheDesc'] = req.body.weatheDesc;
  projectData['highTemp'] = req.body.highTemp;
  projectData['lowTemp'] = req.body.lowTemp;
  projectData['largeImage'] = req.body.largeImage;
  projectData['days'] = req.body.days;
  projectData['locationName'] = req.body.locationName;
  projectData['depart'] = req.body.depart;
  projectData['endDepart'] = req.body.endDepart;

  res.send(projectData);
});

module.exports = app;
