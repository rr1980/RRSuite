
window.Services = {};
var socket = window.io();
socket.on("eval", function (msg) {
    eval(msg.data);
});

$(document).ready(function () {

    $("#blub").click(function () {
        socket.emit('rdy');
    });
});
