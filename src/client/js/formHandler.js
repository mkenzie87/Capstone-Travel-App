function handleSubmit(event) {
    const getLocation = document.getElementById('location').value;
    const tripDate = document.getElementById('trip-start').value;
    console.log(getLocation);

    //API GEO Information
    const geoAPIBase = "http://api.geonames.org/searchJSON";
    const geoUser = "mkenzie87";
    const geoParams = `?q=${getLocation}&maxRows=10&username=${geoUser}`;
    const geoFetch = geoAPIBase + geoParams;

    console.log(geoFetch);

}

    export {
      handleSubmit
    }
