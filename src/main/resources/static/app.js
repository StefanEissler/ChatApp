var stompClient = null;

$(document).ready(
    $("#card-footer").hide()
)

$(document).ready(function(){
    $("#connectButton").click( function(){
        if(stompClient == null) {
            connect();
            $("#card-footer").show();
            document.getElementById("connectButton").value = "Disconnect";
        }else {
            disconnect();
            $("#card-footer").hide()
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
        stompClient.subscribe('/topic/messages ', function (message) {
            showMessage(JSON.parse(message));
        });
    });
}

function sendMessage() {
    stompClient.send("app/chat/", {}, JSON.stringify({'content':$("#messages").val()}));
}

function showMessage(message){
    $("messages").append("<tr><td>" + message + "</td></tr>")
}

function getMessages(){
    $.get("http://localhost:8080/messages", {}, JSON.stringify(message));
}