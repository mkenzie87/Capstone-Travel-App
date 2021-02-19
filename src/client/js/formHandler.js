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
const weatherCurrentAPIBase = "https://api.weatherbit.io/v2.0/current";
const weatherHistoryAPIBase = "https://api.weatherbit.io/v2.0/current";
const weatherAPIKey = "e9828cd2c56e45fcaefec003e2efc322"



function handleSubmit(event) {
    event.preventDefault()



    console.log(geoFetch); // logging fetch Url
    console.log(tripDate); // logging date test

    getLocationData(geoFetch) // this will trigger the getLocationData function
      // New Syntax!
      .then(function(data) {
          const geoLat = data.geonames[0].lat; // storing location latitude
          const geoLng = data.geonames[0].lng; // storing location longitute

          console.log(geoLat + " Lat Data") // logging out location latitue
          console.log(geoLng + " Lng Data") // logging out location longitute

        // Add data
        console.log(data);

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




const dateCompare = async (long, lat) => {

  const tripDate = document.getElementById('trip-start').value;
  // Current Data Variables
  const date = new Date(); // gets Current Date
  const day = date.getDate(); // gets current day
  const month = date.getMonth() + 1; // gets current month need to add 1 because it starts with 0
  const year = date.getFullYear(); // get current month
  const currentFullDate = parseInt(`${year},${month},${day}`); // Full Current Date
  const currentUTC = Date.UTC(currentFullDate);

  //Selected Trip Date
  const selectedDate = parseInt(tripDate); // Selected Trip Date
  const selectedUTC = Date.UTC(selectedDate);

  // Comparing Days
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const compareDate =  Math.abs((selectedUTC - currentUTC) / _MS_PER_DAY);

  if (compareDate < 16) {
    response = await fetch()
  } else {
    response = await fetch()
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
