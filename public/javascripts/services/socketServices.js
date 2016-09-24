var socketServices = function (data) {
    var self = this;
    var registered = [];
    self.emit = function (what, callback) {
        var check = false;
        for (var i in registered) {
            if (registered[i].what === what) {
                return;
            }
        }
        registered.push({ what: what, cb: callback });
        socket.emit(what);
        socket.on(what + "-response", function (data) {
            callback(data);
        });
    }
};