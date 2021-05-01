var mlbTeams = {};

const stadiums = {
  dbacks:	{city: 'Phoenix, AZ, US', hexColor: '#A71930', rgbColor: '(167,25,48)', domed: true},
  braves: {city: 'Cumberland, GA', hexColor: '#CE1141', rgbColor: '(206,17,65)', domed: false},
  orioles: {city: 'Baltimore, MD, US', hexColor: '#DF4601', rgbColor: '(223,70,1)', domed: false},
  redsox: {city: 'Boston, MA, US', hexColor: '#BD3039', rgbColor: '(189, 48, 57)', domed: false},
  cubs: {city: 'Chicago, IL, US', hexColor: '#0E3386', rgbColor: '(14,51,134)', domed: false},
  whitesox: {city: 'Chicago, IL, US', hexColor: '#27251F', rgbColor: '(39,37,31)', domed: false},
  reds: {city: 'Cincinnati, OH, US', hexColor: '#C6011F', rgbColor: '(198,1,31)', domed: false},
  indians: {city: 'Cleveland, OH, US', hexColor: '#0C2340', rgbColor: '(12,35,64)', domed: false},
  rockies: {city: 'Denver, CO, US', hexColor: '#33006F', rgbColor: '(51,0,111)', domed: false},
  tigers:	{city: 'Detroit, MI, US', hexColor: '#0C2340', rgbColor: '(12,35,64)', domed: false},
  astros: {city: 'Houston, TX, US', hexColor: '#002D62', rgbColor: '(0,45,98)', domed: true},
  royals: {city: 'Kansas City, MO, US', hexColor: '#004687', rgbColor: '(0,70,135)', domed: false},
  angels: {city: 'Anaheim, CA, US', hexColor: '#862633', rgbColor: '(134,38,51)', domed: false},
  dodgers: {city: 'Los Angeles, CA, US', hexColor: '#005A9C', rgbColor: '(0,90,156)', domed: false},
  marlins: {city: 'Miami, FL, US', hexColor: '#000000', rgbColor: '(0,0,0)', domed: true},
  brewers: {city: 'Milwaukee, WI, US', hexColor: '#12284B', rgbColor: '(18, 40, 75)', domed: true},
  twins: {city: 'Minneapolis, MN, US', hexColor: '#002B5C', rgbColor: '(0,43,92)', domed: false},
  mets: {city: 'Queens, NY, US', hexColor: '#002D72', rgbColor: '(0,45, 114)', domed: false},
  yankees: {city: 'Bronx, NY, US', hexColor: '#0C2340', rgbColor: '(12,35,64)', domed: false},
  athletics: {city: 'Oakland, CA, US', hexColor: '#003831', rgbColor: '(0,56,49)', domed: false},
  phillies: {city: 'Philadelphia, PA, US', hexColor: '#E81828', rgbColor: '(232,24,40)', domed: false},
  pirates: {city: 'Pittsburgh, PA, US', hexColor: '#27251F', rgbColor: '(39,37,31)', domed: false},
  cardinals: {city: 'St. Louis, MO, US', hexColor: '#C41E3A', rgbColor: '(196,30,58)', domed: false},
  padres: {city: 'San Diego, CA, US', hexColor: '#002D62', rgbColor: '(0,45,98)', domed: false},
  giants: {city: 'San Francisco, CA, US', hexColor: '#FD5A1E', rgbColor: '(253,90,30)', domed: false},
  mariners: {city: 'Seattle, WA, US', hexColor: '#0C2C56', rgbColor: '(12,44,86)', domed: true},
  rays: {city: 'St. Petersburg, FL, US', hexColor: '#092C5C', rgbColor: '(9,44,92)', domed: true},
  rangers: {city: 'Arlington, TX, US', hexColor: '#003278', rgbColor: '(0,50,120)', domed: true},
  bluejays: {city: 'Toronto, CA', hexColor: '#134A8E', rgbColor: '(19,74,142)', domed: false},
  nationals: {city: 'Washington, DC, US', hexColor: '#AB0003', rgbColor: '(171,0,3)', domed: false},
};

var getMlbTeamData = function() {
  fetch('https://statsapi.mlb.com/api/v1/teams')
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        var j = 0;
        for (var i = 0; i < data.teams.length; i++) {
          var team = data.teams[i];
          if (team.league.id == 103 || team.league.id == 104) {
            // console.log(team.teamName);
            var key = team.teamName.toLowerCase();
            var stadiumKey = key.replace(' ', '').replace('-', '');
            mlbTeams[key] = 
              {
                mlbStatsId: team.id,
                name: team.name,
                stadiumName: team.venue.name,
                stadiumLocation:  stadiums[stadiumKey].city,
                isDomed: stadiums[stadiumKey].domed,
                hexColor: stadiums[stadiumKey].hexColor,
                rgbColor: stadiums[stadiumKey].rgbColor,
              };
          };
        }
        console.log(mlbTeams);
        document.querySelector('#team-data').textContent = JSON.stringify(mlbTeams);
      });
    }
  });
};

getMlbTeamData();