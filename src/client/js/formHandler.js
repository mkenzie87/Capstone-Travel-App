//Get API Data
let allAPIData = {};

//API GEO Information
const geoAPIBase = "http://api.geonames.org/searchJSON";
const geoUser = "mkenzie87";
const geoParams = `?q=houston&maxRows=10&country=US&username=${geoUser}`;
const geoFetch = geoAPIBase + geoParams;


//API Weatherbit Information
const weatherCurrentAPIBase = "https://api.weatherbit.io/v2.0/forecast/daily";
const weatherHistoryAPIBase = "https://api.weatherbit.io/v2.0/history/daily";
const weatherAPIKey = "e9828cd2c56e45fcaefec003e2efc322"

//PixaBay API Information:
// Example: https://pixabay.com/api/?key=APIKEY&q=yellow+flowers&image_type=photo&pretty=true
const pixaBayAPI = "20382333-a6e161748baba1efcb9cec3ce";
const pixaBayAPIBase = "https://pixabay.com/api/?key="


function handleSubmit(event) {
  event.preventDefault()
  const getLocation = document.getElementById('location').value;
  const tripDate = document.getElementById('trip-start').value; // Start Date for Trip
  const tripEndDate = document.getElementById('trip-end').value; // End Date for Trip

  getLocationData(geoAPIBase, getLocation) // this will trigger the getLocationData function

    .then(function(geoData) {
      const geoLat = geoData.geonames[0].lat; // storing location latitude
      const geoLng = geoData.geonames[0].lng; // storing location longitute

      // add Geo data to server object
      allAPIData.geoLat = geoData.geonames[0].lat;
      allAPIData.geoLng = geoData.geonames[0].lng;
      allAPIData.depart = tripDate;
      allAPIData.endDepart = tripEndDate;

      // console.log("Latitude Data ", geoLat);
      // console.log("Long Data ", geoLng);

      // Add data
      console.log(geoData);

      // Run dateCompare Function to see Days between
      const daysBetween = dateCompare(tripDate);

      let weatherAPI = ""; // set weatherAPI to empty string to hold Weather API
      if (daysBetween <= 7) {
        //https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely
        console.log("Made it in the Current API", daysBetween);
        weatherAPI = `${weatherCurrentAPIBase}?lat=${geoLat}&lon=${geoLng}&units=I&key=${weatherAPIKey}`;
      } else {
        //https:api.weatherbit.io/v2.0/history/daily?lat=38.123&lon=-78.543&start_date=2021-02-14&end_date=2021-02-15
        console.log("Made it in the History API" + daysBetween);
        weatherAPI = `${weatherHistoryAPIBase}?lat=${geoLat}&lon=${geoLng}&start_date=${tripDate}&end_date=${tripEndDate}&units=I&key=${weatherAPIKey}`;

      }

      allAPIData.days = daysBetween;
      return getWeatherData(weatherAPI); // run getWeatherData to return fetched data

    })

    .then(function(weatherData) {
      console.log("Weather API Data returned: ", weatherData);

      allAPIData.highTemp = weatherData.data[0].high_temp; // holds high temp value
      allAPIData.lowTemp = weatherData.data[0].low_temp; // holds low temp value
      allAPIData.currentTemp = weatherData.data[0].temp; // holds current temp value
      allAPIData.weatheDesc = weatherData.data[0].weather.description; // describes weather value
      allAPIData.locationName = weatherData.city_name; //

      return getImageData(getLocation);

    })

    .then(function(imageData) {
      console.log("Pixabay API Data returned: ", imageData);

      allAPIData.largeImage = imageData.hits[0].largeImageURL; // getting image url from fetch
      allAPIData.imageTotal = imageData.totalHits; //getting image totals from search


      console.log(allAPIData); // logging out all data

      postData('/postData',
        allAPIData
      )
    })

    .then(function(newData) {

      updateUI()
    })

}

// Fetching Data for GeoNames API to Return Lat and lng
const getLocationData = async (geoFetch, location) => {

  const res = await fetch(`${geoAPIBase}?q=${location}&maxRows=10&country=US&username=${geoUser}`)
  try {

    const data = await res.json();
    console.log("GeoNames data Showing " + data)
    return data;
  } catch (error) {
    console.log("GeoNames error", error);
    // appropriately handle the error
  }
}

//Fetching Data for the Weather API to return weather with Data from GeoNames API
const getWeatherData = async (weatherAPIURL) => {

  const res = await fetch(weatherAPIURL)

  try {
    const data = await res.json();
    console.log("Return Weather API " + data)
    return data;
  } catch (error) {
    console.log("Weather Data Error", error);
  }


}

const getImageData = async (city) => {
  //Example: https://pixabay.com/api/?key=APIKEY&q=yellow+flowers&image_type=photo&pretty=true
  const res = await fetch(pixaBayAPIBase + pixaBayAPI + "&q=" + city + "&image_type=photo&pretty=true")

  try {
    const data = await res.json();
    console.log("Return Pixa Bay Data " + data)
    return data;
  } catch (error) {
    console.log("PixaBay Data Error", error);
  }
}



function dateCompare(tripDate, tripEndDate) {

  let selectedDate = new Date(tripDate);

  let currentDate = (tripEndDate === undefined) ? new Date() : new Date(tripEndDate);

  // time difference
  let timeDiff = Math.abs(currentDate.getTime() - selectedDate.getTime());

  // days difference
  let compareDate = Math.ceil(timeDiff / (1000 * 3600 * 24));

  console.log(compareDate); //logging days difference

  return compareDate

}

// Project 3 UpdateUI Example
const updateUI = async () => {
  const request = await fetch('/allWeatherData');
  try {
    const allData = await request.json();

    let tripLength = dateCompare(allData.depart, allData.endDepart);

    let locationBackground = `url(${allData.largeImage})`;
    document.getElementById('data-wrapper').style.cssText = "display: grid; opacity: 1";
    document.getElementById('current-temp').innerHTML = allData.currentTemp;
    document.getElementById('weather-info').innerHTML = allData.weatheDesc;
    document.getElementById('high-temp').innerHTML = allData.highTemp;
    document.getElementById('low-temp').innerHTML = allData.lowTemp;
    document.getElementById('departing').innerHTML = allData.depart;
    document.getElementById('trip-length').innerHTML = tripLength;
    document.getElementById('location-name').innerHTML = allData.locationName;
    document.getElementById('location-background').style.backgroundImage = locationBackground;

    console.log(tripLength);

  } catch (error) {
    console.log("error", error);
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

export {
  handleSubmit
}
