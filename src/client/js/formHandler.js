//Get Input Fields

//API GEO Information
const geoAPIBase = "http://api.geonames.org/searchJSON";
const geoUser = "mkenzie87";
const geoParams = `?q=houston&maxRows=10&country=US&username=${geoUser}`;
const geoFetch = geoAPIBase + geoParams;


//API Weatherbit Information
const weatherCurrentAPIBase = "https://api.weatherbit.io/v2.0/forecast/daily";
const weatherHistoryAPIBase = "http://api.weatherbit.io/v2.0/history/daily";
const weatherAPIKey = "e9828cd2c56e45fcaefec003e2efc322"

//PixaBay API Information:
// Example: https://pixabay.com/api/?key=APIKEY&q=yellow+flowers&image_type=photo&pretty=true
const pixaBayAPI = "20382333-a6e161748baba1efcb9cec3ce";
const pixaBayAPIBase = "https://pixabay.com/api/?key="


function handleSubmit(event) {
    event.preventDefault()
    const getLocation = document.getElementById('location').value;


    getLocationData(geoAPIBase, getLocation) // this will trigger the getLocationData function

      .then(function(geoData) {
          const geoLat = geoData.geonames[0].lat; // storing location latitude
          const geoLng = geoData.geonames[0].lng; // storing location longitute

          console.log("Latitude Data ", geoLat);
          console.log("Long Data ", geoLng);

        // Add data
        console.log(geoData);

        // Run dateCompare Function to see Days between
        const daysBetween = dateCompare();
        console.log(daysBetween); // log days between number

        let weatherAPI = ""; // set weatherAPI to empty string to hold Weather API
        if (daysBetween > 7) {
          //https:api.weatherbit.io/v2.0/history/daily?lat=38.123&lon=-78.543&start_date=2021-02-14&end_date=2021-02-15
          console.log("Made it in the History API" + daysBetween);
          weatherAPI = `${weatherHistoryAPIBase}?lat=${geoLat}&lon=${geoLng}&start_date=${tripDate}&end_date=2021-02-30`;
        } else {
          //https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely
          console.log("Made it in the Current API", daysBetween);
          weatherAPI = `${weatherCurrentAPIBase}?lat=${geoLat}&lon=${geoLng}&key=${weatherAPIKey}`;
        }

        return getWeatherData(weatherAPI); // run getWeatherData to return fetched data

      })

      .then(function(weatherData) {
        console.log("Weather API Data returned: ", weatherData);
        const highTemp = weatherData.data[0].high_temp; // storing high temperature
        const lowTemp = weatherData.data[0].low_temp; // storing low temperature
        const stateName = weatherData.state_code; // storying state abbrev


        console.log("High Temp ", highTemp);
        console.log("Low Temp ", lowTemp);
        console.log("State Code ", stateName);

        return getImageData(getLocation);
      })

      .then(function(imageData) {
        console.log("Pixabay API Data returned: ", imageData);
        const webImage = imageData.hits[0].webformatURL; // storing web imageData
        const largeImage = imageData.hits[0].largeImageURL; // storing Large imageData

        console.log("Web Image URL: ", webImage);
        console.log("Large Image URL: ", largeImage);

      });





      // .then(function(newData) {
      //
      //   updateUI()
      // })

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

    try{
      const data = await res.json();
      console.log("Return Pixa Bay Data " + data)
      return data;
    } catch (error) {
      console.log("PixaBay Data Error", error);
    }
}



const dateCompare = async (geoLat, geoLng) => {

  const tripDate = document.getElementById('trip-start').value; // Set Date for Trip
  const setTripDate = new Date(tripDate); //Adding Set Date Normal Formatting

// I am having an issue with this if i wrap it in a setDate() comes back with a long string of numbers
  // const endDate = setTripDate.getDate() + 1;


  // Current Data Variables
  const date = new Date(); // gets Current Date
  const day = date.getDate(); // gets current day
  const month = date.getMonth() + 1; // gets current month need to add 1 because it starts with 0
  const year = date.getFullYear(); // get current month

  // Discard the time and time-zone information.
  const setTripUTC = Date.UTC(setTripDate.getFullYear(), setTripDate.getMonth(), setTripDate.getDate());
  const currentUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  // Comparing Days
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const compareDate =  Math.floor((currentUTC - setTripUTC) / _MS_PER_DAY);


  return compareDate;

}

// Project 3 UpdateUI Example
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


export {
      handleSubmit
    }
