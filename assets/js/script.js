/*
  Functionality needed:
  - handle user team input
  - fetch team's upcoming schedule from MLB API
  - fetch forecast for the upcoming week in the team's city from OpenWeather API
  - display upcoming games with overview weather info
  - fetch hourly forecast for a single day (selected game) from OpenWeather API
  - display game info with detailed weather info, starting pitchers, game start time
  - store searched team(s) (last 3?) in local storage
*/

const OWM_KEY = 'f396f0f7fdce40c1a84f7337a2c39948';

const mlbTeamsData = JSON.parse('{"id108":{"slug":"angels","mlbStatsId":108,"name":"Los Angeles Angels","shortName":"Angels","stadiumName":"Angel Stadium","stadiumLocation":"Anaheim, CA, US","isDomed":false,"hexColor":"#862633","rgbColor":"(134,38,51)"},"id109":{"slug":"dbacks","mlbStatsId":109,"name":"Arizona Diamondbacks","shortName":"D-backs","stadiumName":"Chase Field","stadiumLocation":"Phoenix, AZ, US","isDomed":true,"hexColor":"#A71930","rgbColor":"(167,25,48)"},"id110":{"slug":"orioles","mlbStatsId":110,"name":"Baltimore Orioles","shortName":"Orioles","stadiumName":"Oriole Park at Camden Yards","stadiumLocation":"Baltimore, MD, US","isDomed":false,"hexColor":"#DF4601","rgbColor":"(223,70,1)"},"id111":{"slug":"redsox","mlbStatsId":111,"name":"Boston Red Sox","shortName":"Red Sox","stadiumName":"Fenway Park","stadiumLocation":"Boston, MA, US","isDomed":false,"hexColor":"#BD3039","rgbColor":"(189, 48, 57)"},"id112":{"slug":"cubs","mlbStatsId":112,"name":"Chicago Cubs","shortName":"Cubs","stadiumName":"Wrigley Field","stadiumLocation":"Chicago, IL, US","isDomed":false,"hexColor":"#0E3386","rgbColor":"(14,51,134)"},"id113":{"slug":"reds","mlbStatsId":113,"name":"Cincinnati Reds","shortName":"Reds","stadiumName":"Great American Ball Park","stadiumLocation":"Cincinnati, OH, US","isDomed":false,"hexColor":"#C6011F","rgbColor":"(198,1,31)"},"id114":{"slug":"indians","mlbStatsId":114,"name":"Cleveland Indians","shortName":"Indians","stadiumName":"Progressive Field","stadiumLocation":"Cleveland, OH, US","isDomed":false,"hexColor":"#0C2340","rgbColor":"(12,35,64)"},"id115":{"slug":"rockies","mlbStatsId":115,"name":"Colorado Rockies","shortName":"Rockies","stadiumName":"Coors Field","stadiumLocation":"Denver, CO, US","isDomed":false,"hexColor":"#33006F","rgbColor":"(51,0,111)"},"id116":{"slug":"tigers","mlbStatsId":116,"name":"Detroit Tigers","shortName":"Tigers","stadiumName":"Comerica Park","stadiumLocation":"Detroit, MI, US","isDomed":false,"hexColor":"#0C2340","rgbColor":"(12,35,64)"},"id117":{"slug":"astros","mlbStatsId":117,"name":"Houston Astros","shortName":"Astros","stadiumName":"Minute Maid Park","stadiumLocation":"Houston, TX, US","isDomed":true,"hexColor":"#002D62","rgbColor":"(0,45,98)"},"id118":{"slug":"royals","mlbStatsId":118,"name":"Kansas City Royals","shortName":"Royals","stadiumName":"Kauffman Stadium","stadiumLocation":"Kansas City, MO, US","isDomed":false,"hexColor":"#004687","rgbColor":"(0,70,135)"},"id119":{"slug":"dodgers","mlbStatsId":119,"name":"Los Angeles Dodgers","shortName":"Dodgers","stadiumName":"Dodger Stadium","stadiumLocation":"Los Angeles, CA, US","isDomed":false,"hexColor":"#005A9C","rgbColor":"(0,90,156)"},"id120":{"slug":"nationals","mlbStatsId":120,"name":"Washington Nationals","shortName":"Nationals","stadiumName":"Nationals Park","stadiumLocation":"Washington, DC, US","isDomed":false,"hexColor":"#AB0003","rgbColor":"(171,0,3)"},"id121":{"slug":"mets","mlbStatsId":121,"name":"New York Mets","shortName":"Mets","stadiumName":"Citi Field","stadiumLocation":"Queens, NY, US","isDomed":false,"hexColor":"#002D72","rgbColor":"(0,45, 114)"},"id133":{"slug":"athletics","mlbStatsId":133,"name":"Oakland Athletics","shortName":"Athletics","stadiumName":"Oakland Coliseum","stadiumLocation":"Oakland, CA, US","isDomed":false,"hexColor":"#003831","rgbColor":"(0,56,49)"},"id134":{"slug":"pirates","mlbStatsId":134,"name":"Pittsburgh Pirates","shortName":"Pirates","stadiumName":"PNC Park","stadiumLocation":"Pittsburgh, PA, US","isDomed":false,"hexColor":"#27251F","rgbColor":"(39,37,31)"},"id135":{"slug":"padres","mlbStatsId":135,"name":"San Diego Padres","shortName":"Padres","stadiumName":"Petco Park","stadiumLocation":"San Diego, CA, US","isDomed":false,"hexColor":"#002D62","rgbColor":"(0,45,98)"},"id136":{"slug":"mariners","mlbStatsId":136,"name":"Seattle Mariners","shortName":"Mariners","stadiumName":"T-Mobile Park","stadiumLocation":"Seattle, WA, US","isDomed":true,"hexColor":"#0C2C56","rgbColor":"(12,44,86)"},"id137":{"slug":"giants","mlbStatsId":137,"name":"San Francisco Giants","shortName":"Giants","stadiumName":"Oracle Park","stadiumLocation":"San Francisco, CA, US","isDomed":false,"hexColor":"#FD5A1E","rgbColor":"(253,90,30)"},"id138":{"slug":"cardinals","mlbStatsId":138,"name":"St. Louis Cardinals","shortName":"Cardinals","stadiumName":"Busch Stadium","stadiumLocation":"St. Louis, MO, US","isDomed":false,"hexColor":"#C41E3A","rgbColor":"(196,30,58)"},"id139":{"slug":"rays","mlbStatsId":139,"name":"Tampa Bay Rays","shortName":"Rays","stadiumName":"Tropicana Field","stadiumLocation":"St. Petersburg, FL, US","isDomed":true,"hexColor":"#092C5C","rgbColor":"(9,44,92)"},"id140":{"slug":"rangers","mlbStatsId":140,"name":"Texas Rangers","shortName":"Rangers","stadiumName":"Globe Life Field","stadiumLocation":"Arlington, TX, US","isDomed":true,"hexColor":"#003278","rgbColor":"(0,50,120)"},"id141":{"slug":"bluejays","mlbStatsId":141,"name":"Toronto Blue Jays","shortName":"Blue Jays","stadiumName":"Rogers Centre","stadiumLocation":"Toronto, CA","isDomed":false,"hexColor":"#134A8E","rgbColor":"(19,74,142)"},"id142":{"slug":"twins","mlbStatsId":142,"name":"Minnesota Twins","shortName":"Twins","stadiumName":"Target Field","stadiumLocation":"Minneapolis, MN, US","isDomed":false,"hexColor":"#002B5C","rgbColor":"(0,43,92)"},"id143":{"slug":"phillies","mlbStatsId":143,"name":"Philadelphia Phillies","shortName":"Phillies","stadiumName":"Citizens Bank Park","stadiumLocation":"Philadelphia, PA, US","isDomed":false,"hexColor":"#E81828","rgbColor":"(232,24,40)"},"id144":{"slug":"braves","mlbStatsId":144,"name":"Atlanta Braves","shortName":"Braves","stadiumName":"Truist Park","stadiumLocation":"Cumberland, GA, US","isDomed":false,"hexColor":"#CE1141","rgbColor":"(206,17,65)"},"id145":{"slug":"whitesox","mlbStatsId":145,"name":"Chicago White Sox","shortName":"White Sox","stadiumName":"Guaranteed Rate Field","stadiumLocation":"Chicago, IL, US","isDomed":false,"hexColor":"#27251F","rgbColor":"(39,37,31)"},"id146":{"slug":"marlins","mlbStatsId":146,"name":"Miami Marlins","shortName":"Marlins","stadiumName":"loanDepot park","stadiumLocation":"Miami, FL, US","isDomed":true,"hexColor":"#000000","rgbColor":"(0,0,0)"},"id147":{"slug":"yankees","mlbStatsId":147,"name":"New York Yankees","shortName":"Yankees","stadiumName":"Yankee Stadium","stadiumLocation":"Bronx, NY, US","isDomed":false,"hexColor":"#0C2340","rgbColor":"(12,35,64)"},"id158":{"slug":"brewers","mlbStatsId":158,"name":"Milwaukee Brewers","shortName":"Brewers","stadiumName":"American Family Field","stadiumLocation":"Milwaukee, WI, US","isDomed":true,"hexColor":"#12284B","rgbColor":"(18, 40, 75)"}}');

const gameOverviewCardTemplate = 
  '<div class="card-content">' +
  '  <div class="row valign-wrapper game-header">' +
  '    <div class="col s5 valign-wrapper"><img class="away-team-logo" src="" height="32"><p class="away-team-name"></p></div>' +
  '    <div class="col s2 valign-wrapper"><p>at</p></div>' +
  '    <div class="col s5 valign-wrapper"><p class="home-team-name"></p><img class="home-team-logo" src="" height="32"></div>' +
  '  </div>' +
  '  <div class="center-align game-time">' +
  '  </div>' +
  '  <div class="center-align game-weather">' +
  '    <img class="weather-icon" src="">' +
  '    <span class="card-title weather-overview"></span>' +
  '    <p class="left-align weather-description"></p>' +
  '  </div>' +
  '  <div class="center"><a herf="" class="waves-effect waves-light btn tickets-button" target="_blank"><i class="material-icons left">panorama_horizontal</i>Buy Tickets</a></div>'
  '</div>';


const teamSelectMainEl = document.querySelector('#team-select-main');
const teamSelectBarEl = document.querySelector('#team-select-bar');
const teamSelectEl = document.querySelector('#team-select');
const startScreenEl = document.querySelector('#startScreen');
const gamesOverviewEl = document.querySelector('#gamesOverview');

var gamesDataJson = localStorage.getItem('gamesData');
if (!gamesDataJson) {
  gamesData = {};
} else {
  gamesData = JSON.parse(gamesDataJson);
}

var userTZOffset = parseInt(dayjs().format('Z').replace(/\:.*$/, '')) * 60 * 60;
console.log('user time zone', userTZOffset);

/* 
  MLB Stats API schedule endpoint:
  https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate={start_date}}&endDate={end_date}&teamId=[team_id]
*/
var fetchSchedule = function (teamKey) {
  var teamData = mlbTeamsData[teamKey];

  // get current date
  var today = dayjs();
  var startDate = today.format('YYYY-MM-DD');
  var endDate = today.add(13, 'day').format('YYYY-MM-DD');

  // fetch from mlb stats api
  var endpoint = 'https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=' + startDate + '&endDate=' + endDate + '&teamId=' + teamData.mlbStatsId;
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
          // save schedule data in local storage for quick retrieval
          if (!gamesData[teamKey]) {
            gamesData[teamKey] = { schedule: schedule };
          } else {
            gamesData[teamKey].schedule = schedule;
          }
          localStorage.setItem('gamesData', JSON.stringify(gamesData));

          // temporary, until event listeners are hooked up to controls
          fetchWeatherForecast(teamKey);
        });
      } else {
        console.error('Unable to fetch schedule information.');
        console.error('[ ' + response.statusText + ' ]');
      }
    }).catch(function (error) {
      console.error('Unable to fetch schedule information.');
      console.error('[ ' + error + ' ]');
    });

  // does not need to return anything
  return true;
};

/*
  OpenWeather API endpoints:
  city search: https://api.openweathermap.org/geo/1.0/direct?q={city,state_code,country_code}&limit=1&appid={api_key}
  weather: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon=-{lon}&exclude=minutely&units=imperial&appid={api_key}
*/
var fetchWeatherForecast = function (teamKey) {
  var location = mlbTeamsData[teamKey].stadiumLocation;
  var query = location.toLowerCase().replaceAll(', ', ',');
  var endpoint = 'https://api.openweathermap.org/geo/1.0/direct?q=' + query + '&limit=10&appid=' + OWM_KEY;

  fetch(endpoint)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.length) {
            // console.log('city data', data[0]);

            var endpoint = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&exclude=minutely&units=imperial&appid=' + OWM_KEY;

            fetch(endpoint).then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                  // store weather data in local storage to use in the hourly forecast for game day
                  if (!gamesData[teamKey]) {
                    gamesData[teamKey] = { weather: data };
                  } else {
                    gamesData[teamKey].weather = data;
                  }
                  localStorage.setItem('gamesData', JSON.stringify(gamesData));

                  // pass data to displaySchedule() function
                  displaySchedule(teamKey);
                });
              } else {
                console.log('Unable to fetch weather information.');
                console.log('[ ' + response.statusText + ' ]');
              }
            }).catch(function (error) {
              console.error('Unable to fetch weather information.');
              console.error('[ ' + error + ' ]');
            });
          }
        });
      } else {
        console.error('Unable to fetch city information.');
        console.error('[ ' + response.statusText + ' ]');
      }
    }).catch(function (error) {
      console.error('Unable to fetch city information.');
      console.error('[ ' + error + ' ]');
    });

  // does not need to return anything
};

var fetchGameDetails = function (teamKey, index) {
  console.log('game data', gamesData[teamKey].schedule.games[index]);
  // use the passed in index to grab the gameDetailsUri at gamesData.schedule.dates[index].games[0].link
  // fetch game details from mlb stats api using the gameDetailsUri
  var endpoint = 'https://statsapi.mlb.com/' + gamesData[teamKey].schedule.games[index].link;
  fetch(endpoint)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // append the game details to the game data at the given index in gamesData.schedule.dates
          gamesData[teamKey].schedule.games[index].details = data;
          localStorage.setItem('gamesData', JSON.stringify(gamesData));
          // call displayGameDayInfo(), passing in the index of the game/date in gamesData.schedule.dates array
          displayGameDayInfo(teamKey, index);
        });
      } else {
        console.error('Unable to fetch game information.');
        console.error('[ ' + response.statusText + ' ]');
      }
    }).catch(function (error) {
      console.error('Unable to fetch game information.');
      console.error('[ ' + error + ' ]');
    });

  // does not need to return anything
};

var buildScheduleOverviewCard = function (gameData, weatherData) {
  console.log('game', gameData);
  console.log('weather', weatherData);
  var awayId = gameData.teams.away.team.id;
  var homeId = gameData.teams.home.team.id;

  var gameOverviewCardEl = document.createElement('div');
  gameOverviewCardEl.setAttribute('class', 'card medium game-overview-card');
  gameOverviewCardEl.innerHTML = gameOverviewCardTemplate.slice(0);
  gameOverviewCardEl.querySelector('.away-team-name').innerHTML = mlbTeamsData['id' + awayId].shortName + '<span class="record"><br>(' + gameData.teams.away.leagueRecord.wins + ' - ' + gameData.teams.away.leagueRecord.losses + ')</span>';
  gameOverviewCardEl.querySelector('.home-team-name').innerHTML = mlbTeamsData['id' + homeId].shortName + '<span class="record"><br>(' + gameData.teams.home.leagueRecord.wins + ' - ' + gameData.teams.home.leagueRecord.losses + ')</span>';
  gameOverviewCardEl.querySelector('.away-team-logo').setAttribute('src', './assets/images/teams/' + mlbTeamsData['id' + awayId].slug + '.svg');
  gameOverviewCardEl.querySelector('.home-team-logo').setAttribute('src', './assets/images/teams/' + mlbTeamsData['id' + homeId].slug + '.svg');
  gameOverviewCardEl.querySelector('.game-time').innerHTML = '<p>' + gameData.gameTimeLocal + '</p>';
  gameOverviewCardEl.querySelector('.weather-icon').setAttribute('src', 'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png');
  gameOverviewCardEl.querySelector('.weather-overview').textContent = weatherData.weather[0].main;
  gameOverviewCardEl.querySelector('.weather-description').innerHTML = 'High of ' + Math.round(weatherData.temp.max) + '&deg;F with an evening temperature of ' + Math.round(weatherData.temp.eve) + '&deg;F and a ' + Math.round(weatherData.pop * 100) + '% chance of precipitation. The UV index will peak at ' + weatherData.uvi;
  gameOverviewCardEl.querySelector('.tickets-button').setAttribute('href', 'https://www.mlb.com/' + mlbTeamsData['id' + homeId].slug + '/tickets');

  return gameOverviewCardEl;
};
  
var displaySchedule = function (teamKey) {
  // use the schedule data returned from the mlb stats api to fill in/build out the upcoming schedule
  // if no games, this function should display a message and hide the forecast container
  console.log('gamesData', gamesData);
  document.querySelector('#upcoming-games').innerHTML = '';

  var currentDate = dayjs().format('YYYY-MM-DDT:00:00:00');

  var gamesShown = 0;

  for (var i = 0; i < gamesData[teamKey].schedule.games.length; i++) {
    var gameData = gamesData[teamKey].schedule.games[i];
    gameData.gameTimeLocal = dayjs(gameData.gameDate).subtract((userTZOffset - gamesData[teamKey].weather.timezone_offset) / 60, 'm').format('dddd, M/D [@] h:mm A')
    var dayIndex = (dayjs(gameData.officialDate).unix() - dayjs(currentDate).unix()) / (60 * 60 * 24);
    var weatherData = gamesData[teamKey].weather.daily[dayIndex];
    if (weatherData) {
      document.querySelector('#upcoming-games').appendChild(buildScheduleOverviewCard(gameData, weatherData));
      gamesShown++;
    } else {
      // if there are at least some games...
      if (i) {
        // stop after displaying the last one we have weather data for
        break;

      // otherwise, if there are no games with weather to display
      } else {
        document.querySelector('#upcoming-games').innerHTML = '<h4>Sorry, there are no home games within the next week.</h4>';
      }
    }
  }

  // if we ended a row early
  // if (gamesShown % 3) {
  //   console.log('shown', gamesShown);
  //   for (var j = 0; j < 3 - (gamesShown % 3); j++) {
  //     // pad the display
  //     var spacerDiv = document.createElement('div');
  //     spacerDiv.setAttribute('class', 'car medium game-overview-card');
  //     document.querySelector('#upcoming-games').appendChild(spacerDiv);
  //   }
  // }

  startScreenEl.classList.add('hide');
  while (teamSelectMainEl.childNodes.length > 0) {
    teamSelectBarEl.appendChild(teamSelectMainEl.firstChild);
  }
  gamesOverviewEl.classList.remove('hide');

};

// var displayForecast = function (weatherData) {
//   // use the weather data returned from the openweather api to fill in/build out the 7 day forecast
//   console.log('weather data', weatherData);
// };

var displayGameDayInfo = function (teamKey, index) {
  // use weather data from local storage and game details from local storage to fill in/build out game day info 
  console.log('game day info', gamesData[teamKey].schedule.games[index].details);
};

var handleTeamSelect = function (event) {
  var teamKey = event.target.value;
  // grab the selected team id
  // do a lookup on the mlbTeamsData array
  // call fetchSchedule() passing the selected team's object
  console.log('team selected', teamKey);
  console.log('selected team data', mlbTeamsData[teamKey]);
  fetchSchedule(teamKey);
};

var handleGameClick = function (event) {
  console.log(event);
  // get the selectedIndex from the selected game
  // call fetchGameDetails() passing the selectedIndex
  console.log('game selected');
};

var teamOptions = [];
document.addEventListener('DOMContentLoaded', (event) => {

  // populate team select with data from mlbTeamsData object
  var teamsArr = Object.entries(mlbTeamsData);
  teamsArr = teamsArr.sort((a, b) => { return (a[1].name < b[1].name ? -1 : 1) });
  for (var i = 0; i < teamsArr.length; i++) {
    var teamOptionEl = document.createElement('option');
    teamOptionEl.setAttribute('value', teamsArr[i][0]);
    teamOptionEl.innerHTML = teamsArr[i][1].name + '&nbsp;&nbsp;';
    teamSelectEl.appendChild(teamOptionEl);
  }
  var selectEls = document.querySelectorAll('select');
  var instances = M.FormSelect.init(selectEls, { width: 'auto' });
})

// stuff to do when page it loaded

// add an event listener to the team select input(s) and call handleTeamSelect()
teamSelectEl.addEventListener('change', handleTeamSelect);

// add an event listener, probably on the container around the upcoming games, to caputre the game selected by the user for drilldown
// upcomingGamesEl.addEventListener('click', handleGameClick);