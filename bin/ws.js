var ws = require("nodejs-websocket");
var io = require('socket.io');

var server = ws.createServer(function(conn){
    console.log("New connection!");
    conn.on("text", function(str){
       // io.sockets.broadcast()
        //console.log("Received: " + str);
        //conn.sendText("Ok!");
    })
    conn.on("close", function(code, reason){
        console.log("connection close");
    })
}).listen(81)