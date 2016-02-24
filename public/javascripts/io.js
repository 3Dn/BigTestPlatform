var socket = io();

socket.on('on_connect', function(data){
    console.log(data.data);
});

socket.emit('ready', 'q');