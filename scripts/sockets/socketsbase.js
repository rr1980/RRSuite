var global = require('../../global.js');

module.exports = function (io) {
    'use strict';
    io.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('rdy', function (from, msg) {
            var e = "alert('JO');";
            socket.emit('eval', { data: e });
        });
    });
};
