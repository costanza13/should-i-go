/*
 
  *** NOTES ***

  APIs:

  MLB Stats: http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2021-03-28&endDate=2021-05-01&teamId=147

  Weather: https://openweathermap.org/api
    examples:
      city search: http://api.openweathermap.org/geo/1.0/direct?q=Bronx,NY,US&limit=3&appid=f396f0f7fdce40c1a84f7337a2c39948
      weather: http://api.openweathermap.org/data/2.5/onecall?lat=40.8273&lon=-73.9236&exclude=minutely&units=imperial&appid=f396f0f7fdce40c1a84f7337a2c39948

  
  Teams with domed stadiums:

  - T-Mobile Park (Seattle, Washington) Seattle Mariners (Safeco Field originally)
  - Rogers Centre (Toronto, Canada) Toronto Blue Jays
  - Minute Maid Park (Houston, Texas) Houston Astros
  - Chase Field (Phoenix, Arizona) Arizona Diamondbacks. Also, check out why Chase Field has a Pool
  - Marlins Park (Miami, Florida) Miami Marlins
  - Globe Life Field (Arlington, Texas) Texas Rangers
  - American Family Field (Milwaukee, Wisconsin) Milwaukee Brewers
  - Tropicana Field (St Petersburgh, Florida) Tampa Bay Rays
*/


/*
  Functionality needed:
  - handle user team input
  - fetch team's upcoming schedule from MLB API
  - fetch forecast for the upcoming week in the team's city from OpenWeather API
  - display upcoming games with overview weather info
  - fetch hourly forecast for a single day (selected game) from OpenWeather API
  - display game info with detailed weather info
  - store searched team (last 3?) in local storage
  - 
*/

const mlbTeamsData = [
  {
    key: 'yankees',
    mlbStatsId: 147,
    name: 'New York Yankees',
    stadiumName: 'Yankee Stadium',
    stadiumLocation: 'Bronx, NY',
    isDomed: false,
    color: '#142448'
  }, 
  {
    key: 'giants',
    mlbStatsId: 137,
    name: 'San Francisco Giants',
    stadiumName: 'Oracle Park',
    stadiumLocation: 'San Francisco, CA',
    isDomed: false,
    color: '#ff4814',
  },
];

var fetchSchedule = function(teamData) {
  // fetch from mlb stats api
  // append the team data to the schedule data object
  // pass data to displaySchedule() function

  // does not need to return anything
};

var fetchWeatherForecast = function(location) {
  // developer's choice: location could be an object with latitude and longitude or just the city name
  // if using city name, fetch location info from openweather 'geo' api endpoint
  // then fetch weather data from openweather 'onecall' api
  // store weather data in local storage to use in the hourly forecast for game day
  // pass data to displayForecast() function

  // does not need to return anything
};

var fetchGameDetails = function(index) {
  // use the passed in index to grab the gameDetailsUri at scheduleData.dates[index].games[0].link
  // fetch game details from mlb stats api using the gameDetailsUri
  // append the game details to the game data at the given index in scheduleData.dates
  // call displayGameDayInfo()
}

var displaySchedule = function(scheduleData) {
  // use the schedule data returned from the mlb stats api to fill in/build out the upcoming schedule
  // if no games, this function should display a message and hide the forecast container
};

var displayForecast = function(weatherData) {
  // use the weather data returned from the openweather api to fill in/build out the 7 day forecast
};

var displayGameDayInfo = function() {
  // use weather data from local storage and game details from local storage to fill in/build out game day info 
};

var handleTeamSelect = function (event) {
  // store the team id in an array in local storage (search history)
  // grab the selected team id
  // do a lookup on the mlbTeamsData array
  // call fetchSchedule() passing the selected team's object
  // call fetchWeatherForecast() passing the team's location data (city or lat/long?)

};

var handleGameClick = function(event) {
  // get the selectedIndex from the selected game
  // call fetchGameDetails() passing the selectedIndex
};

// add an event listener to the team select input(s) and call handleTeamSelect()
// add an event listener, probably on the container around the upcoming games, to caputre the game selected by the user for drilldown