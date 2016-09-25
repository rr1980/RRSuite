var g = require('../../global.js');
var async = require("async");
var self = this;
var it;
var follow_length = 0;
var games_check_count = 0;

exports.follows = [];
exports.state = {
    auth: false,
    token: false,
    rdy: false
};

Timer = function () {
    if (it === undefined) {
        self.UpdateFollowAsync();
        it = setInterval(function () {
            self.UpdateFollowAsync();
        }, 60 * 1000);  //60 * 1000
    }
};

self.UpdateFollowAsync = function () {
    g.request(get_follower_url(), function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var r = JSON.parse(body);
            self.follows = [];
            follow_length = r.streams.length;
            games_check_count = 0;
            games(r.streams);
        } else {
            console.log("twitch...: UpdateFollowAsync fail" + JSON.stringify(error));
            console.log(body);
            if (response.statusCode === 401) {
                self.Init();
            }
        }
    });
};

function games_check(stream) {
    games_check_count++;
    self.follows.push(stream);
    if (games_check_count === follow_length) {
        self.state.rdy = true;
        console.log('twitch...: sync rdy');
    }
}

games = function (streams) {
    async.each(streams,
        function (item, callback) {
            g.request(get_games_url(item), function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var r = JSON.parse(body);
                    item.gameData = r.games[0];
                    games_check(item);
                } else {
                    console.log("twitch...: games error" + JSON.stringify(error));
                    console.log(body);
                }
            });
            callback();
        }
    );
};

exports.Auth = function (req, res, sucess, fail) {
    if (self.state.auth && self.state.token) {
        Timer();
        return true;
    }
    else {
        g.router.get('/twitch*', function (req, res, next) {
            if (req.query.code !== null) {
                if (get_token(req.query.code)) {
                    res.redirect("/");
                } else {
                    return false;
                }

            } else {
                fail("in set_auth");
                console.log('NOPE!!! /twitch_api.js /twitch no code in query');
                res.send("NOPE!!! /twitch_api.js /twitch no code in query");
            }
        });
        res.redirect(get_auth_url());
    }
};

get_token = function (code) {
    var receive = g.request_Sync("POST", get_auth_token_url(code));
    var result = JSON.parse(receive.body);
    if (result.access_token !== undefined && result.refresh_token !== undefined) {
        self.state.auth = true;
        self.state.token = true;
        g.config.twitch_access_token = result.access_token;
        g.config.twitch_refresh_token = result.refresh_token;
        return true;
    }
    else {
        return false;
    }
}

self.Init = function () {
    var receive = g.request_Sync("GET", get_auth_check_url());
    var result = JSON.parse(receive.body);

    if (result.identified === true) {
        self.state.auth = true;
        if (result.token.valid === true) {
            self.state.token = true;
            Timer();
        } else {
            self.state.token = false;
        }
    } else {
        self.state.auth = false;
    }
};

get_games_url = function (item) {
    return g.config.twitch_games_url +
        "?client_id=" + g.config.twitch_client_id +
        "&q=" + item.game +
        "&type=suggest";
};

get_follower_url = function () {
    return g.config.twitch_follower_url +
        "?client_id=" + g.config.twitch_client_id +
        "&oauth_token=" + g.config.twitch_access_token;
};

get_auth_token_url = function (code) {
    return g.config.twitch_token_url +
        "?client_id=" + g.config.twitch_client_id +
        "&client_secret=" + g.config.twitch_client_secret +
        "&grant_type=authorization_code" +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&code=" + code;
};

get_auth_url = function () {
    return g.config.twitch_auth_url +
        "?response_type=code" +
        "&client_id=" + g.config.twitch_client_id +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&scope=" + g.config.twitch_scope[0];
};

get_auth_check_url = function () {
    return g.config.twitch_auth_check_url + "?client_id=" + g.config.twitch_client_id + "&oauth_token=" + g.config.twitch_access_token;
};