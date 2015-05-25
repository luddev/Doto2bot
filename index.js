var irc = require('irc');
var config = require("./config.js");
// var leagueMatches = require("LeagueMatches.js");
// var league = require("League.js");
var MessageListener = require("./MessageListeners.js");

var mListener = new MessageListener;


console.log(config.SERVER);


var client = new irc.Client(config.SERVER, config.NICKNAME, {
    channels: config.channelList,
    userName: config.USERNAME,
    realName: config.REALNAME,
    port: config.PORT.
    autoRejoin: config.AUTO_REJOIN,
    floodProtection: config.FLOOD_PROTECTION
});


client.addListener('error', function(message) {
    console.log('error: ', message);
});

client.addListener('message', function (from, to, message) {
    //console.log(from + ' => ' + to + ': ' + message);
    mListener.handler.emit('message',from,to,message,function(sendBuffer,printHelp) {
        if(sendBuffer)   {
            for(data in sendBuffer)  {
                if(data == 4)   {
                    break;
                }
                for(tdata in sendBuffer[data])   {
                    
                    if(message.toLowerCase() == config.prefix + "upcoming" )    {
                        client.notice(from,sendBuffer[data][tdata]);
                    }
                    else {
                        client.say(to,sendBuffer[data][tdata]);
                    }
                }
                if(message.toLowerCase() == config.prefix + "upcoming" && sendBuffer.length != data)    {
                    client.notice(from,"--------------------------");
                }
                else if(sendBuffer.length != data){
                    client.say(to,"--------------------------");
                }

            }  
        }
        else if(printHelp == true){
            client.say(to,"Try these : !live, !upcoming");
        }
        else {
            client.say(to,sendBuffer);
        }


    });
});

