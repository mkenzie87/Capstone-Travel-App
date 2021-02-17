//Get Input Fields

const getLocation = document.getElementById('location').value;
const tripDate = document.getElementById('trip-start').value;


//API GEO Information
const geoAPIBase = "http://api.geonames.org/searchJSON";
const geoUser = "mkenzie87";
const geoParams = `?q=${getLocation}&maxRows=10&username=${geoUser}`;
const geoFetch = geoAPIBase + geoParams;


function handleSubmit(event) {

    console.log(geoFetch); // logging fetch Url

    getLocationData(geoFetch) // this will trigger the getLocationData function
      // New Syntax!
      .then(function(data) {
        // Add data
        console.log(data);
        // postData('/addWeather', {
        //   date: newDate,
        //   name: data.name,
        //   temp: data.main.temp,
        //   feels_like: data.main.feels_like,
        //   temp_max: data.main.temp_max,
        //   temp_desc: data.weather[0].description,
        //   content: newContent
        // })
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



export {
      handleSubmit
    }
