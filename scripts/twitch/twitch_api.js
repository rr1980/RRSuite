var g = require('../../global.js');


exports.GetChannelsFollowAsync = function (callback) {
    var uri = "https://api.twitch.tv/kraken/users/Oxi19800/follows/channels?client_id=" + g.config.twitch.client_id;
    g.request(uri,
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                callback(JSON.parse(body));
            }
            else {
                console.log("ERROR............: " + JSON.stringify(error));
                console.log(body);
            }
        });
};

exports.GetToken = function (res, callback) {
    var uri = g.config.twitch.token_url +
        "?client_id=" + g.config.twitch.client_id +
        "&client_secret=" + g.config.twitch.client_secret +
        "&grant_type=authorization_code" +
        "&redirect_uri=" + g.config.twitch.redirect_uri +
        "&code=" + g.config.twitch.code +
        "&state=" + g.config.twitch.state;
    // var result = g.request_Sync("GET", uri);
    g.request({
        url: uri,
        method: "POST"
    }, function (error, response, body) {
        var b = JSON.parse(body);
        g.config.twitch.access_token = b.access_token;
        g.config.twitch.refresh_token = b.refresh_token;
        callback(res);
    });
};

exports.AuthUrl = function () {
    return g.config.twitch.auth_url +
        "?response_type=code" +
        "&client_id=" + g.config.twitch.client_id +
        "&redirect_uri=" + g.config.twitch.redirect_uri +
        "&scope=" + g.config.twitch.scope[0] +
        "&state=" + g.config.twitch.state;
}

exports.GetChannelsFollow = function () {
    var uri = "https://api.twitch.tv/kraken/streams/followed"+
    "?client_id="+g.config.twitch.client_id+
    "&oauth_token="+g.config.twitch.access_token;
    var result = g.request_Sync("GET", uri);
    var f = JSON.parse(result.body.toString('utf-8'));
    return f.streams;
};

