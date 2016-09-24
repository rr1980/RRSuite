var headerViewmodel = function (data) {
    var self = this;
    var _ = new socketServices();
    self.items = ko.observableArray();
    ko.mapping.fromJS(data, {}, self);

    self.scrolled = function (vm, event) {
        event.currentTarget.scrollLeft -= (event.deltaY * 60);
    };

    self.toggle_Nav = function () {
        if (!$(".rr-nav").hasClass("rr-nav-open")) {
            socket.emit('nav-click');
        }
        else{
            $(".rr-nav").toggleClass('rr-nav-open');
        }
    };

    socket.on("nav-click-response", function (data) {
        for (var f in data) {
            self.items.push(data[f]);
        }
        $(".rr-nav").toggleClass('rr-nav-open');
    });
};