var g = require('../../global.js');
var async = require("async");

var self = this;
self.code = "";
exports.follows = {};
<<<<<<< HEAD
exports.state = {
    auth: false,
    token: false
};
var it;
self.url = "https://api.twitch.tv/kraken";
=======
self.code = {};
var it;
>>>>>>> refs/remotes/origin/twitch

exports.Auth = function(req, res, sucess, fail) {
    if (self.state.auth !== true || self.state.token !== true) {
        res.redirect(self.get_auth_url());
    } else {
        sucess();
    }
};

<<<<<<< HEAD
exports.set_auth = function(req, res, next, sucess, fail) {
    if (req.query.code !== null) {
        self.code = req.query.code;
        self.get_auth(sucess, fail);

    } else {
        fail("in set_auth");
        console.log('NOPE!!! /twitch_api.js /twitch no code in query');
        res.send("NOPE!!! /twitch_api.js /twitch no code in query");
    }

};

self.UpdateFollowAsync = function() {
    console.log('twitch...: sync');
    g.request(self.get_follower_url(), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var r = JSON.parse(body);
            self.follows = r.streams;
        } else {
            console.log("ERROR............: " + JSON.stringify(error));
            console.log(body);
            if (response.statusCode === 401) {
                self.Init();
            }
        }
    });
};

self.get_auth = function(sucess, fail) {
    if (self.state.auth !== true || self.state.token !== true) {
        var result = g.request_Sync("POST", self.get_auth_token_url());
        var b = JSON.parse(result.body);
        if (b.access_token !== undefined && b.refresh_token !== undefined) {
            self.state.auth = true;
            self.state.token = true;
            g.config.twitch_access_token = b.access_token;
            g.config.twitch_refresh_token = b.refresh_token;
            sucess();
        } else {
            fail("in get_auth");
        }
    }
};

self.Init = function() {
    var receive = g.request_Sync("GET", self.get_auth_url_check());
    var result = JSON.parse(receive.body);

    if (result.identified === true) {
        self.state.auth = true;
        if (result.token.valid === true) {
            self.state.token = true;
        } else {
            self.state.token = false;
        }
    } else {
        self.state.auth = false;
    }
};

self.get_follower_url = function() {
    return g.config.twitch_follower_url +
        "?client_id=" + g.config.twitch_client_id +
        "&oauth_token=" + g.config.twitch_access_token;
};

self.get_auth_token_url = function() {
    return g.config.twitch_token_url +
=======
self.UpdateFollowAsync = function(fail_token) {
    console.log('twitch...: sync');

    var uri = "https://api.twitch.tv/kraken/streams/followed" +
        "?client_id=" + g.config.twitch_client_id +
        "&oauth_token=" + g.config.twitch_access_token;
    g.request(uri,
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var r = JSON.parse(body);
                self.follows = r.streams;
                self.games();
            } else {
                console.log("ERROR............: " + JSON.stringify(error));
                console.log(body);
                if (response.statusCode === 401) {
                    fail_token();
                }
            }
        });
};

self.games = function() {
    async.each(self.follows,
        function(item, callback) {

            var uri = "https://api.twitch.tv/kraken/search/games" +
                "?client_id=" + g.config.twitch_client_id +
                "&q=" + item.game +
                "&type=suggest";

            g.request(uri,
                function(error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var r = JSON.parse(body);
                        item.gameData = r.games[0];

                    } else {
                        console.log("ERROR............: " + JSON.stringify(error));
                        console.log(body);
                    }
                });
            callback();

        },
        function(err) {
            console.log(JSON.stringify(err));
        }
    );
};

self.Timer = function() {
    if (it === undefined) {
        self.UpdateFollowAsync();
        it = setInterval(function() {
            self.UpdateFollowAsync();
        }, 60 * 1000);
    }
};

exports.isAuth = function(req, res, next) {
    var url = "https://api.twitch.tv/kraken" +
        "?client_id=" + g.config.twitch_client_id +
        "&oauth_token=" + g.config.twitch_access_token;
    var result = g.request_Sync("GET", url);
    var b = JSON.parse(result.body);

    if (b.identified === false) {
        console.log('twitch...: isAuth = false');
        res.redirect(self.AuthUrl());
    } else {
        console.log('twitch...: isAuth = true');
        if (b.token.valid === true) {
            console.log('twitch...: token_valid = true');
            self.Timer();
            return true;
        } else {
            console.log('twitch...: token_valid = false');
            res.redirect(self.AuthUrl());
            return false;
        }
    }
};

exports.Init = function(code) {
    self.code = code;
    var url = g.config.twitch_token_url +
>>>>>>> refs/remotes/origin/twitch
        "?client_id=" + g.config.twitch_client_id +
        "&client_secret=" + g.config.twitch_client_secret +
        "&grant_type=authorization_code" +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&code=" + self.code;
};

<<<<<<< HEAD
self.get_auth_url = function() {
=======
self.AuthUrl = function() {
>>>>>>> refs/remotes/origin/twitch
    return g.config.twitch_auth_url +
        "?response_type=code" +
        "&client_id=" + g.config.twitch_client_id +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&scope=" + g.config.twitch_scope[0];
<<<<<<< HEAD
};

self.get_auth_url_check = function() {
    return self.url + "?client_id=" + g.config.twitch_client_id + "&oauth_token=" + g.config.twitch_access_token;
}
=======
};
>>>>>>> refs/remotes/origin/twitch
