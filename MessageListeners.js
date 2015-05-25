


var _ = require('underscore');
var config = require("./config.js");
var lMatches = require('./LeagueMatches.js');
var lLeague = require('./League.js');


var MessageListener = function()	{
	var events = require("events");
	var handler = require("events").EventEmitter;
	this.events = events;
	this.handler = new handler;

	this.handler.on('message', function(from,to,message,sendCallback)	{
		//Data.
		console.log(from + ' => ' + to + ' '+ message);
		if(_.contains(config.channelList,to.toLowerCase()))	{
			var leagueId = message.split(" ")[1] == " " ? "2733" : message.split(" ")[1];
			switch(message.toLowerCase())	{
				case config.prefix + "live":
					//Replace with leagueId
					lMatches.getLiveMatches("2733",sendCallback);
					break;
				case config.prefix + "upcoming":
					//Replace with leagueId
					lMatches.getUpcomingMatches("2733",sendCallback);
					break;
				case config.prefix + "help":
					sendCallback(null,true);
				default:
			}
		}

	});
}

module.exports = MessageListener;