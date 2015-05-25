//Fetch matches Based on League_id
//

var config = require("./config.js");
var request = require('request');
var URI = require('URIjs');
var irc = require('irc');

var moment = require('moment');




var STEAM_LIVE_MATCH_BY_LEAGUE = "https://api.steampowered.com/IDOTA2Match_570/GetLiveLeagueGames/v0001/";
var STEAM_UPCOMING_MATCH_BY_LEAGUE = "https://api.steampowered.com/IDOTA2Match_570/GetScheduledLeagueGames/v0001/";
//Need param key = API_KEY and league_id = league ID.

var LeagueMatches = function()	{

};

var lm = LeagueMatches.prototype;

lm.getLiveMatches = function(league_id,callback)	{
	var data;
	var uri = new URI(STEAM_LIVE_MATCH_BY_LEAGUE).query({
		key : config.API_KEY,
		league_id : league_id
	});
	request(uri.toString(),function(error, response,body){
		if(error)	{
			callback(error);
		}
		else {
			//Parse Data and use callback to pass data.
			data = JSON.parse(body);
			callback(parseLiveMatchesData(data));
		}
	});
	
};

lm.getUpcomingMatches = function(league_id,callback)	{
	var data;
	var uri = new URI(STEAM_UPCOMING_MATCH_BY_LEAGUE).query({
		key : config.API_KEY,
		league_id : league_id
	});
	request(uri.toString(),function(error, response,body){
		if(error)	{
			callback(error);
		}
		else {
			//Parse Data and use callback to pass data.
			data = JSON.parse(body);
			callback(parseUpcomingMatchesData(data));
		}
	});

};

//Returns a friendly string parsed string.
var parseLiveMatchesData = function (data)	{
	var matchDataArray = [];
	var games = data.result.games;
	for(game in games)	{
		if(typeof games[game].scoreboard.duration !== 'undefined')	{
			var date = moment.utc(moment.unix(games[game].scoreboard.duration));
			var fnString = [
				irc.colors.wrap("dark_green",games[game].radiant_team.team_name) + " Vs " + irc.colors.wrap("dark_red",games[game].dire_team.team_name),
				irc.colors.wrap("dark_blue","Series : ") + irc.colors.wrap("dark_green",games[game].radiant_series_wins) + irc.colors.wrap("dark_blue","-") + irc.colors.wrap("dark_red",games[game].dire_series_wins),
				irc.colors.wrap("dark_blue","Score : ") + irc.colors.wrap("dark_green",games[game].scoreboard.radiant.score) + irc.colors.wrap("dark_blue","-") + irc.colors.wrap("dark_red",games[game].scoreboard.dire.score),
				irc.colors.wrap("dark_blue","Time : ") + date.minutes() + ":" + date.seconds()
			];
			matchDataArray.push(fnString);
		}

	}

	return matchDataArray;
};

//Returns a friendly string parsed string.
var parseUpcomingMatchesData = function (data)	{
	var matchDataArray = [];
	var games = data.result.games;
	for(game in games)	{
		var date = moment.utc(moment.unix(games[game].starttime));
		if(games[game].teams.length >= 2)	{
			var fnString = [
				irc.colors.wrap("dark_green",games[game].teams[0].team_name) + " Vs " + irc.colors.wrap("dark_red",games[game].teams[1].team_name),
				irc.colors.wrap("dark_blue","Starts in") + " : " + date.hours() + ":" + date.minutes() + ":" + date.seconds()
			];
			matchDataArray.push(fnString);
		}

		
	}
	return matchDataArray;
};

module.exports = new LeagueMatches;