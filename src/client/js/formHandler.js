//Get Input Fields
const getLocation = document.getElementById('location').value;

//API GEO Information
const geoAPIBase = "http://api.geonames.org/searchJSON";
const geoUser = "mkenzie87";
const geoParams = `?q=${getLocation}&maxRows=10&username=${geoUser}`;
const geoFetch = geoAPIBase + geoParams;


//API Weatherbit Information
//Example Link:
//https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely
const weatherCurrentAPIBase = "http://api.weatherbit.io/v2.0/current";
const weatherHistoryAPIBase = "http://api.weatherbit.io/v2.0/history/daily";
const weatherAPIKey = "e9828cd2c56e45fcaefec003e2efc322"



function handleSubmit(event) {
    event.preventDefault()

    getLocationData(geoFetch) // this will trigger the getLocationData function

      .then(function(data) {
          const geoLat = data.geonames[0].lat; // storing location latitude
          const geoLng = data.geonames[0].lng; // storing location longitute

        // Add data
        console.log(data);
         dateCompare(geoLat, geoLng);
        //console.log(dateCompare);

      })

      .then(function(newData) {

        updateUI()
      })

}

const getLocationData = async (geoFetch) => {

  const res = await fetch(geoFetch)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
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


  let response;
  if (compareDate > 7) {
    //https:api.weatherbit.io/v2.0/history/daily?lat=38.123&lon=-78.543&start_date=2021-02-14&end_date=2021-02-15
    console.log("Made it in the If Statement");
    response = await fetch(`${weatherHistoryAPIBase}?lat=${geoLng}&lon=${geoLng}&start_date=${tripDate}&end_date=2021-02-30`)
  } else {
    //https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely
    console.log("Made it in the Else statement");
    response = await fetch(`${weatherCurrentAPIBase}?lat=${geoLng}&lon=${geoLng}&key=${weatherAPIKey}&include=minutely`)
  }

  try {
      return await response.json();
  } catch (e) {
      console.log('error', e)
  }
}


export {
      handleSubmit
    }
