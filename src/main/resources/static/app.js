var stompClient = null;

var messages = null;

$(document).ready(
    $("#card-body").hide()
)

$(document).ready(function(){
    $("#connectButton").click( function(){
        if(stompClient == null) {
            connect();
            $("#card-body").show();
            document.getElementById("connectButton").value = "Disconnect";
        }else {
            disconnect();
            $("#card-body").hide()

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

function showMessage(message){
    $("messages").append("<tr><td>" + message + "</td></tr>")
}

function getMessages(){

}



function sendMessage() {
    stompClient.send("app/chat/", {}, {'content': $("#ChatMessage"), 'chatId': '1', 'userId': '1'});
}