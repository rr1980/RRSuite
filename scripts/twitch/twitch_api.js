var g = require('../../global.js');

exports.GetChannelsFollow = function (callback) {
    var uri = "https://api.twitch.tv/kraken/users/Oxi19800/follows/channels?client_id=" + g.config.twitch.client_id
    var result = {};
    g.request(uri,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(JSON.parse(body));
            }
            else {
                console.log("ERROR............: " + JSON.stringify(error));
                console.log(body);
            }
        });
}