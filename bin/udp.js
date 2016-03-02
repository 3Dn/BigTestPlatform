var PORT = 8888;
//var HOST = '255.255.255.255';

var net = require('net');
var dgram = require('dgram');
var udp_server = dgram.createSocket('udp4');

udp_server.on('listening', function(){
    var address = udp_server.address();
    console.log('UDP server listening on ' + address.address + ":" + address.port);
});

udp_server.on('message', function(message, remote){
    console.log(remote.address + ":" + remote.port + " - " + message);
    var message_to_send = new Buffer('Ok!');
    udp_server.send(message_to_send, 0, message_to_send.length, 9999, remote.host, function(err, bytes){
        if (err) throw err;
        console.log('Send to:' + remote.host + ":" + remote.port);
    })
});

udp_server.bind(PORT);

