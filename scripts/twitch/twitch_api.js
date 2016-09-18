var g = require('../../global.js');
var self = this;
exports.follows = {};
self.code = {};
self.access_token = {};
self.refresh_token = {};

exports.GetChannelsFollow = function () {
    var uri = "https://api.twitch.tv/kraken/streams/followed" +
        "?client_id=" + g.config.twitch_client_id +
        "&oauth_token=" + self.access_token;
    var result = g.request_Sync("GET", uri);
    var f = JSON.parse(result.body.toString('utf-8'));
    return f.streams;
};

exports.GetChannelsFollowAsync = function (callback) {
    var uri = "https://api.twitch.tv/kraken/streams/followed" +
        "?client_id=" + g.config.twitch_client_id +
        "&oauth_token=" + self.access_token;
    g.request(uri,
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var r = JSON.parse(body);
                callback(r.streams);
            }
            else {
                console.log("ERROR............: " + JSON.stringify(error));
                console.log(body);
            }
        });
};

exports.isAuth = function () {
    for (var prop in self.access_token) {
        if (self.access_token.hasOwnProperty(prop))
            return true;
    }

    return false;

};

exports.GetToken = function (code, res, callback) {
    self.code = code;
    var uri = g.config.twitch_token_url +
        "?client_id=" + g.config.twitch_client_id +
        "&client_secret=" + g.config.twitch_client_secret +
        "&grant_type=authorization_code" +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&code=" + self.code;
    // var result = g.request_Sync("GET", uri);
    g.request({
        url: uri,
        method: "POST"
    }, function (error, response, body) {
        var b = JSON.parse(body);
        self.access_token = b.access_token;
        self.refresh_token = b.refresh_token;
        callback(res);
    });
};

exports.AuthUrl = function () {
    return g.config.twitch_auth_url +
        "?response_type=code" +
        "&client_id=" + g.config.twitch_client_id +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&scope=" + g.config.twitch_scope[0] +
        "&state=" + g.config.twitch_state;
};


