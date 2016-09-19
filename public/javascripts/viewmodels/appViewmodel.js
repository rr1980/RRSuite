var appViewmodel = function(data) {
    var self = this;

    ko.mapping.fromJS(data, {
        'headerViewmodel': {
            create: function(data) {
                return new headerViewmodel();
            }
        }
        // 'indexViewModel': {
        //     create: function(data) {
        //         return new indexViewModel();
        //     }
        // }
    }, self);
};