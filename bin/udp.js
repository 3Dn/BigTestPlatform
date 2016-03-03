var PORT = 8888;

var net = require('net');
var dgram = require('dgram');
var udp_server = dgram.createSocket('udp4');

var clients_data = [];

function add_member(ip,mac,func){
    this.ip = ip;
    this.mac = mac;
    this.func = func;
}

function ret_clients_data(){
    return clients_data;
}

udp_server.on('listening', function(){
    var address = udp_server.address();
    console.log('UDP server listening on ' + address.address + ":" + address.port);
});

udp_server.on('message', function(message, remote){
    console.log(remote.address + ":" + remote.port + " - " + message);
    var message_to_send = new Buffer("192.168.1.150");
    udp_server.send(message_to_send, 0, message_to_send.length, remote.port, remote.address, function (err, bytes) {
        if (err) throw err;
        //console.log('Send to:' + remote.host + ":" + remote.port);
    });
});

udp_server.bind(PORT);

module.exports = add_member;
module.exports = ret_clients_data;