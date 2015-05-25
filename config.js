//Configuration File
//

var config = function()	{
	this.SERVER = "irc.rizon.net";
	this.USERNAME = "doto2";
	this.NICKNAME = "doto2";
	this.REALNAME = "doto2";
	this.PORT = 6667;
	this.AUTO_REJOIN = true;
	this.FLOOD_PROTECTION = true;

	//Use https://steamcommunity.com/dev/apikey for getting one.
	this.API_KEY = "INSERT_API_KEY_HERE";

	this.channelList = ['#doto2'];

	this.prefix = "!";
};

module.exports = new config;



