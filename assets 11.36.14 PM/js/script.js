/*
  APIs:

  MLB Stats: http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2021-03-28&endDate=2021-05-01&teamId=147

  Weather: https://openweathermap.org/api

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
  - fetch list of teams from MLB API, with team name, city info (city info may need to be entered manually, MLB Stats API doesn't include it)
  - handle user city/team input
  - fetch team's upcoming schedule from MLB API
  - fetch forecast for the upcoming week in the team's city from OpenWeather API
  - display upcoming games with overview weather info
  - fetch hourly forecast for a single day (selected game) from OpenWeather API
  - display game info with detailed weather info
  - store searched team (last 3?) in local storage
  - 
*/
