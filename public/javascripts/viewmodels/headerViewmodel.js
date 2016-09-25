var headerViewmodel = function (parent) {
    var self = this;
    var get_twitch_follows_timer = 3;
    self.items = ko.observableArray([]);

    self.scrolled = function (vm, event) {
        event.currentTarget.scrollLeft -= (event.deltaY * 60);
    };

    self.toggle_Nav = function () {
        $(".rr-nav").toggleClass('rr-nav-open');
    };

    socket.on("get-twitch-follows-response", function (result) {
        if (result.length > 0) {
            get_twitch_follows_timer = 60;
        }
        self.items(result);
    });

    var emit_get_follows = function () {
        socket.emit('get-twitch-follows');
        setTimeout(emit_get_follows, get_twitch_follows_timer * 1000);
    }
    setTimeout(emit_get_follows, get_twitch_follows_timer * 1000);
};
