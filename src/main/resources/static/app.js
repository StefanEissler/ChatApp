let stompClient = null;

$(document).ready(
    function(){
        $("#connectButton").click( function(){
            connect();
            document.getElementById("connectButton").value = "Disconnect";
            this.connected = true;
        });

        $("#messageform").submit(function (event) {
            sendMessage();
            event.preventDefault();
        });
});

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