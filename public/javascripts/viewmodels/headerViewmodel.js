var headerViewmodel = function(data) {
    var self = this;
    self.items = ko.observableArray();
    ko.mapping.fromJS(data, {}, self);

    self.scrolled = function(vm, event) {
        event.currentTarget.scrollLeft -= (event.deltaY * 60);
    };

    self.toggle_Nav = function() {
        $.ajax({
            url: "/getFollows",
            type: "GET",
            cahce: false
        }).done(function(data) {
            for (var f in data) {
                self.items.push(data[f]);
            }
            $(".rr-nav").toggleClass('rr-nav-open');
        });

    };
};