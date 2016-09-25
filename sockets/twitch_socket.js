var g = require('../global');

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected');
        // g.twitch_api.onChangeFollows=function(){
        //     socket.emit('headerViewmodel-rdy-response', g.twitch_api.follows);
        // }
        socket.on('get-twitch-follows', function (from, msg) {
            if (g.twitch_api.state.rdy) {
                socket.emit('get-twitch-follows-response', g.twitch_api.follows);
                //  socket.emit('get-twitch-follows-response', []);
            }
        });
    });
};
