var g = require('../../global.js');
var self = this;
exports.follows = {};
self.code = {};



exports.UpdateFollowAsync = function (fail_token) {
    console.log('twitch...: sync');

    var uri = "https://api.twitch.tv/kraken/streams/followed" +
        "?client_id=" + g.config.twitch_client_id +
        "&oauth_token=" + g.config.twitch_access_token;
    g.request(uri,
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var r = JSON.parse(body);
                self.follows = r.streams;
            }
            else {
                console.log("ERROR............: " + JSON.stringify(error));
                console.log(body);
                if (response.statusCode === 401) {
                    fail_token();
                }
            }
        });
};

exports.isAuth = function () {
    var url = "https://api.twitch.tv/kraken" +
        "?client_id=" + g.config.twitch_client_id+
        "&oauth_token=" + g.config.twitch_access_token;
    var result = g.request_Sync("GET", url);
    var b = JSON.parse(result.body);

    if (b.identified === true) {
        console.log('twitch...: isAuth = true');
        if (b.token.valid === true) {
            console.log('twitch...: token_valid = true');
            self.UpdateFollowAsync();
            setInterval(function () {
                self.UpdateFollowAsync();
            }, 60 * 1000);
            return true;
        }
        else{
            console.log('twitch...: token_valid = false');
            return false;
        }
    }
    else {
        console.log('twitch...: isAuth = false');
        return false;
    }
};

exports.Init = function (code) {
    self.code = code;
    var url = g.config.twitch_token_url +
        "?client_id=" + g.config.twitch_client_id +
        "&client_secret=" + g.config.twitch_client_secret +
        "&grant_type=authorization_code" +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&code=" + self.code;

    var result = g.request_Sync("POST", url);
    var b = JSON.parse(result.body);

    g.config.twitch_access_token = b.access_token;
    g.config.twitch_refresh_token = b.refresh_token;
};

exports.AuthUrl = function () {
    return g.config.twitch_auth_url +
        "?response_type=code" +
        "&client_id=" + g.config.twitch_client_id +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&scope=" + g.config.twitch_scope[0];
};


