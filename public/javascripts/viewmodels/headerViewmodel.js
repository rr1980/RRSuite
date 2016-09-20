var headerViewmodel = function(data) {
    var self = this;
    self.items = ko.observableArray();
    ko.mapping.fromJS(data, {}, self);

    self.scrolled = function(vm, event) {
        event.currentTarget.scrollLeft -= (event.deltaY * 60);
    };

    self.toggle_Nav = function(event) {
        console.log(event);


        $.ajax({
            url: "/getFollows",
            type: "GET",
            cahce: false
        }).done(function(data) {
            $(".rr-nav-content").html("");
            for (var f in data) {
                self.items.push(data[f].preview.medium);
            }
            $(".rr-nav").toggleClass('rr-nav-open');
        });
    };
};