var socket = io();

socket.on('on_connect', function(data){
    console.log(data.data);
});

socket.emit('ready', 'q');

function ws_start(webSocketServer){
    esp_ws = new WebSocket(webSocketServer);
    esp_ws.onopen = function(){
        console.log("ESP Ok!");
        esp_ws.send("Hi!");
    }
    esp_ws.onmessage = function(event){
        //console.log("Data: " + event.data);
        document.querySelector('#socket_text').innerHTML = "Data: " + event.data;
    }
    esp_ws.onclose = function(){
        setTimeout(function(){
            ws_start(webSocketServer)
        }, 5000);
    }
}

ws_start("ws://192.168.1.78:81");