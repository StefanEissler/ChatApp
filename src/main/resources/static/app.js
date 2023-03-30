var stompClient = null;

$(document).ready(
    function(){
        $("#connectButton").click( function(){
            if(stompClient == null) {
                connect();
                document.getElementById("connectButton").value = "Disconnect";
            }else {
                disconnect();
                document.getElementById("connectButton").value = "Connect";
            }
        });

        $("#messageform").submit(function (event) {
            sendMessage();
            event.preventDefault();
        });
});

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (data) {
            showMessage(data);
        });
    });
}

function sendMessage() {
    stompClient.send("/app/chat", {}, 
        JSON.stringify({
            "content": $("#ChatMessage").val()
        }));
}

function showMessage(data){
    $("#messages").append("<tr><td>" + $(data.content) + "</td><td>" + $(data.timestamp) + "</td></tr>");
}

function getMessages(){
    $.get("http://localhost:8080/messages", {}, JSON.stringify(message));
}