var appViewmodel =(function () {
    function appViewmodel(parent) {
        var self = this;
        self.headerViewmodel = ko.observable(new headerViewmodel(self));
    }
    return appViewmodel;
})();