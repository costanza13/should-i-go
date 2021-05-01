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

const mlbTeamsData = JSON.parse('{"angels":{"mlbStatsId":108,"name":"Los Angeles Angels","stadiumName":"Angel Stadium","stadiumLocation":"Anaheim, CA, US","isDomed":false,"hexColor":"#862633","rgbColor":"(134,38,51)"},"d-backs":{"mlbStatsId":109,"name":"Arizona Diamondbacks","stadiumName":"Chase Field","stadiumLocation":"Phoenix, AZ, US","isDomed":true,"hexColor":"#A71930","rgbColor":"(167,25,48)"},"orioles":{"mlbStatsId":110,"name":"Baltimore Orioles","stadiumName":"Oriole Park at Camden Yards","stadiumLocation":"Baltimore, MD, US","isDomed":false,"hexColor":"#DF4601","rgbColor":"(223,70,1)"},"red sox":{"mlbStatsId":111,"name":"Boston Red Sox","stadiumName":"Fenway Park","stadiumLocation":"Boston, MA, US","isDomed":false,"hexColor":"#BD3039","rgbColor":"(189, 48, 57)"},"cubs":{"mlbStatsId":112,"name":"Chicago Cubs","stadiumName":"Wrigley Field","stadiumLocation":"Chicago, IL, US","isDomed":false,"hexColor":"#0E3386","rgbColor":"(14,51,134)"},"reds":{"mlbStatsId":113,"name":"Cincinnati Reds","stadiumName":"Great American Ball Park","stadiumLocation":"Cincinnati, OH, US","isDomed":false,"hexColor":"#C6011F","rgbColor":"(198,1,31)"},"indians":{"mlbStatsId":114,"name":"Cleveland Indians","stadiumName":"Progressive Field","stadiumLocation":"Cleveland, OH, US","isDomed":false,"hexColor":"#0C2340","rgbColor":"(12,35,64)"},"rockies":{"mlbStatsId":115,"name":"Colorado Rockies","stadiumName":"Coors Field","stadiumLocation":"Denver, CO, US","isDomed":false,"hexColor":"#33006F","rgbColor":"(51,0,111)"},"tigers":{"mlbStatsId":116,"name":"Detroit Tigers","stadiumName":"Comerica Park","stadiumLocation":"Detroit, MI, US","isDomed":false,"hexColor":"#0C2340","rgbColor":"(12,35,64)"},"astros":{"mlbStatsId":117,"name":"Houston Astros","stadiumName":"Minute Maid Park","stadiumLocation":"Houston, TX, US","isDomed":true,"hexColor":"#002D62","rgbColor":"(0,45,98)"},"royals":{"mlbStatsId":118,"name":"Kansas City Royals","stadiumName":"Kauffman Stadium","stadiumLocation":"Kansas City, MO, US","isDomed":false,"hexColor":"#004687","rgbColor":"(0,70,135)"},"dodgers":{"mlbStatsId":119,"name":"Los Angeles Dodgers","stadiumName":"Dodger Stadium","stadiumLocation":"Los Angeles, CA, US","isDomed":false,"hexColor":"#005A9C","rgbColor":"(0,90,156)"},"nationals":{"mlbStatsId":120,"name":"Washington Nationals","stadiumName":"Nationals Park","stadiumLocation":"Washington, DC, US","isDomed":false,"hexColor":"#AB0003","rgbColor":"(171,0,3)"},"mets":{"mlbStatsId":121,"name":"New York Mets","stadiumName":"Citi Field","stadiumLocation":"Queens, NY, US","isDomed":false,"hexColor":"#002D72","rgbColor":"(0,45, 114)"},"athletics":{"mlbStatsId":133,"name":"Oakland Athletics","stadiumName":"Oakland Coliseum","stadiumLocation":"Oakland, CA, US","isDomed":false,"hexColor":"#003831","rgbColor":"(0,56,49)"},"pirates":{"mlbStatsId":134,"name":"Pittsburgh Pirates","stadiumName":"PNC Park","stadiumLocation":"Pittsburgh, PA, US","isDomed":false,"hexColor":"#27251F","rgbColor":"(39,37,31)"},"padres":{"mlbStatsId":135,"name":"San Diego Padres","stadiumName":"Petco Park","stadiumLocation":"San Diego, CA, US","isDomed":false,"hexColor":"#002D62","rgbColor":"(0,45,98)"},"mariners":{"mlbStatsId":136,"name":"Seattle Mariners","stadiumName":"T-Mobile Park","stadiumLocation":"Seattle, WA, US","isDomed":true,"hexColor":"#0C2C56","rgbColor":"(12,44,86)"},"giants":{"mlbStatsId":137,"name":"San Francisco Giants","stadiumName":"Oracle Park","stadiumLocation":"San Francisco, CA, US","isDomed":false,"hexColor":"#FD5A1E","rgbColor":"(253,90,30)"},"cardinals":{"mlbStatsId":138,"name":"St. Louis Cardinals","stadiumName":"Busch Stadium","stadiumLocation":"St. Louis, MO, US","isDomed":false,"hexColor":"#C41E3A","rgbColor":"(196,30,58)"},"rays":{"mlbStatsId":139,"name":"Tampa Bay Rays","stadiumName":"Tropicana Field","stadiumLocation":"St. Petersburg, FL, US","isDomed":true,"hexColor":"#092C5C","rgbColor":"(9,44,92)"},"rangers":{"mlbStatsId":140,"name":"Texas Rangers","stadiumName":"Globe Life Field","stadiumLocation":"Arlington, TX, US","isDomed":true,"hexColor":"#003278","rgbColor":"(0,50,120)"},"blue jays":{"mlbStatsId":141,"name":"Toronto Blue Jays","stadiumName":"Rogers Centre","stadiumLocation":"Toronto, CA","isDomed":false,"hexColor":"#134A8E","rgbColor":"(19,74,142)"},"twins":{"mlbStatsId":142,"name":"Minnesota Twins","stadiumName":"Target Field","stadiumLocation":"Minneapolis, MN, US","isDomed":false,"hexColor":"#002B5C","rgbColor":"(0,43,92)"},"phillies":{"mlbStatsId":143,"name":"Philadelphia Phillies","stadiumName":"Citizens Bank Park","stadiumLocation":"Philadelphia, PA, US","isDomed":false,"hexColor":"#E81828","rgbColor":"(232,24,40)"},"braves":{"mlbStatsId":144,"name":"Atlanta Braves","stadiumName":"Truist Park","stadiumLocation":"Cumberland, GA","isDomed":false,"hexColor":"#CE1141","rgbColor":"(206,17,65)"},"white sox":{"mlbStatsId":145,"name":"Chicago White Sox","stadiumName":"Guaranteed Rate Field","stadiumLocation":"Chicago, IL, US","isDomed":false,"hexColor":"#27251F","rgbColor":"(39,37,31)"},"marlins":{"mlbStatsId":146,"name":"Miami Marlins","stadiumName":"loanDepot park","stadiumLocation":"Miami, FL, US","isDomed":true,"hexColor":"#000000","rgbColor":"(0,0,0)"},"yankees":{"mlbStatsId":147,"name":"New York Yankees","stadiumName":"Yankee Stadium","stadiumLocation":"Bronx, NY, US","isDomed":false,"hexColor":"#0C2340","rgbColor":"(12,35,64)"},"brewers":{"mlbStatsId":158,"name":"Milwaukee Brewers","stadiumName":"American Family Field","stadiumLocation":"Milwaukee, WI, US","isDomed":true,"hexColor":"#12284B","rgbColor":"(18, 40, 75)"}}');
console.log(mlbTeamsData);

var fetchSchedule = function(teamData) {
  // get current date
  var today = dayjs()
  var startDate = today.format('YYYY-MM-DD');
  var endDate = today.add(13, 'day').format('YYYY-MM-DD');

  // fetch from mlb stats api
  var endpoint = 'https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=' + startDate + '&endDate=' + endDate + '&teamId=' + teamData.mlbStatsId;
  console.log(endpoint);
  fetch(endpoint)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // include the team data in the schedule data object
        var schedule = { teamData: teamData, games: [] };

        for (var i = 0; i < data.dates.length; i++) {
          // handle double headers
          for (var j = 0; j < data.dates[i].games.length; j++) {
            if (data.dates[i].games[j].teams.home.team.id === teamData.mlbStatsId) {
              schedule.games.push(data.dates[i].games[j]);
            }
          }
        }

        // pass data to displaySchedule() function
        displaySchedule(schedule);        
      });
    } else {
      displayError('Unable to fetch schedule information.<br>[ ' + response.statusText + ' ]<br>Please try again later.');
    }
  }).catch(function (error) {
    displayError('Unable to fetch schedule information.<br>[ ' + error + ' ]<br>Please try again later.');
  });

  // does not need to return anything
  return true;
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
  console.log('schedule data', scheduleData);
};

var displayForecast = function(weatherData) {
  // use the weather data returned from the openweather api to fill in/build out the 7 day forecast
  console.log('weather data', weatherData);
};

var displayGameDayInfo = function() {
  // use weather data from local storage and game details from local storage to fill in/build out game day info 
  console.log('game day info');
};

var handleTeamSelect = function (event) {
  // store the team id in an array in local storage (search history)
  // grab the selected team id
  // do a lookup on the mlbTeamsData array
  // call fetchSchedule() passing the selected team's object
  // call fetchWeatherForecast() passing the team's location data (city or lat/long?)
  console.log('team selected');
};

var handleGameClick = function(event) {
  // get the selectedIndex from the selected game
  // call fetchGameDetails() passing the selectedIndex
  console.log('game selected');
};

fetchSchedule(mlbTeamsData['yankees']);

// add an event listener to the team select input(s) and call handleTeamSelect()
// add an event listener, probably on the container around the upcoming games, to caputre the game selected by the user for drilldown