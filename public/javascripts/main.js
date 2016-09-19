window.Services = {};
var socket = window.io();
socket.on("eval", function(msg) { //socket.emit('rdy');
    eval(msg.data);
});

$(document).ready(function() {

    $(function() {
        $(".rr-nav-content").on('mousewheel', function(event, delta) {
            this.scrollLeft -= (delta * 60);
            event.preventDefault();
        });
    });


    $("#blub").click(function() {
        $.ajax({
            url: "/getFollows",
            type: "GET",
            cahce: false
        }).done(function(data) {
            console.debug(data);
            $(".rr-nav-content").html("");
            for (var f in data) {
                var str = "<img class='rr-nav-content-img' src='" + data[f].preview.medium + "' />";
                //var img = $("<img class='rr-nav-content-img' />").attr('src', data[f].preview.medium);
                $(".rr-nav-content").append(str);
            }
            $(".rr-nav").toggleClass('rr-nav-open');
        });
    });

});