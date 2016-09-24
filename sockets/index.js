var g = require('../global');

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('nav-click', function (from, msg) {
            socket.emit('nav-click-response', g.twitch_api.follows);
        });
    });
};
