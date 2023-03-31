let stompClient = null;
let messageList = new Array();

// Button Action Listener
$(document).ready(
    function(){
        $("#connectButton").click( function(){
            connect();
        });

        $("#messageform").submit(function (event) {
            sendMessage();
            event.preventDefault();
        });
});

// Verbindung mit Websocket
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

// Nachricht wird an Websocket verschickt
function sendMessage() {
    stompClient.send("/app/chat", {}, 
        JSON.stringify({
            "content": $("#ChatMessage").val()
        }));
}

// Anzeigen der Nachirchten 
function showMessage(data){
    messageList.push(data);
    let text = "<ul>";
    for(let i = 0; i < messageList.length; i++){
        text += "<li>" + messageList[i] + "</li>";
    }
    text += "</ul>";
    document.getElementById("messages").innerHTML = text; 
}