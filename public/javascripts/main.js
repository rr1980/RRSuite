
window.Services = {};
var socket = window.io();
socket.on("eval", function (msg) {          //socket.emit('rdy');
    eval(msg.data);
});

$(document).ready(function () {

    $("#blub").click(function () {
        $.ajax({
            url: "/getFollows",
            type: "GET",
            cahce: false
        }).done(function (data) {
            console.debug(data);
            $(".rr-content").html("");
            for (var f in data) {
                var str = "<img src='" + data[f].preview.medium + "' />";
                $(".rr-content").append(str);
            }
        });
    });

});
