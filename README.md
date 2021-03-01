# Travel APP

This project works with not 1 not 2 but you guessed it 3 API's. We using GEONames API to grab coordinates from the users input of where they want to go. Once we get that information will pass that data in to the WeatherBit API. This API will allow us to get information on the current weather or historic weather depending on what day the user is leaving. For our last APi we are pulling an image from PixaBay. This will help bring the project alive by getting an image that relates to the City they picked.  


## API Information
GeoNames - To signup go [here](http://www.geonames.org/export/web-services.html).
WeatherBit - To signup go [here](https://www.weatherbit.io/account/create).
PixaBay - To signup go [here](https://pixabay.com/api/docs/).

## How to Start project

First Terminal
```
npm install
```
```
npm run build-dev
```
Second Terminal
```
npm run build-prod && npm start
```

### Travel App ScreenShot
![Alt text](src/client/img/Travel-App.png "Travel App")

### Travel App Results ScreenShot
![Alt text](src/client/img/Travel-Results.png "Travel App Results")

### Travel App Mobile Results ScreenShot
![Alt text](src/client/img/Travel-app-mobile.png "Travel App Mobile Results")
