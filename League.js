//Fetch all Running Leagues.
// Need to add so  that it only fetches active leagues

var config = require("./config.js");
var request = require('request');
var irc = require('irc');

var STEAM_LEAGUES = "https://api.steampowered.com/IDOTA2Match_570/GetLeagueListing/v0001/";
//Need param key = API_KEY
//


var League = function()	{

};

var le = League.prototype;

le.getLeagueList = function(callback)	{

}


module.exports = new League;