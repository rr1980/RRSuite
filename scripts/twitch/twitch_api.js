var g = require('../../global.js');
var async = require("async");
var self = this;
exports.follows = {};
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/twitch
exports.state = {
    auth: false,
    token: false
};
<<<<<<< HEAD
var it;
self.url = "https://api.twitch.tv/kraken";
=======
self.code = {};
var it;
>>>>>>> refs/remotes/origin/twitch
=======
var it;
//self.url = "https://api.twitch.tv/kraken";
>>>>>>> refs/remotes/origin/twitch

exports.Auth = function(req, res, sucess, fail) {
    if (self.state.auth !== true || self.state.token !== true) {
        res.redirect(self.get_auth_url());
    } else {
<<<<<<< HEAD
=======
        self.Timer();
>>>>>>> refs/remotes/origin/twitch
        sucess();
    }
};

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/twitch
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
<<<<<<< HEAD
=======
self.code = {};


>>>>>>> parent of 2f6e9ea... fuck

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

<<<<<<< HEAD
self.get_follower_url = function() {
    return g.config.twitch_follower_url +
        "?client_id=" + g.config.twitch_client_id +
        "&oauth_token=" + g.config.twitch_access_token;
};

self.get_auth_token_url = function() {
    return g.config.twitch_token_url +
=======
self.UpdateFollowAsync = function(fail_token) {
=======

self.UpdateFollowAsync = function() {
>>>>>>> refs/remotes/origin/twitch
    console.log('twitch...: sync');

    g.request(self.get_follower_url(), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var r = JSON.parse(body);
            self.follows = r.streams;
            self.games();
        } else {
            console.log("ERROR............: " + JSON.stringify(error));
            console.log(body);
            if (response.statusCode === 401) {
                self.Init();
            }
        }
    });
};


self.games = function() {
    async.each(self.follows,
        function(item, callback) {
            g.request(self.get_games_url(item), function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    var r = JSON.parse(body);
                    item.gameData = r.games[0];

                } else {
                    console.log("ERROR............: " + JSON.stringify(error));
                    console.log(body);
                }
            });
            callback();
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
    var receive = g.request_Sync("GET", self.get_auth_check_url());
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

<<<<<<< HEAD
exports.Init = function(code) {
    self.code = code;
    var url = g.config.twitch_token_url +
>>>>>>> refs/remotes/origin/twitch
=======
self.get_games_url = function(item) {
    return g.config.twitch_games_url +
        "?client_id=" + g.config.twitch_client_id +
        "&q=" + item.game +
        "&type=suggest";
};

self.get_follower_url = function() {
    return g.config.twitch_follower_url +
        "?client_id=" + g.config.twitch_client_id +
        "&oauth_token=" + g.config.twitch_access_token;
};

self.get_auth_token_url = function() {
    return g.config.twitch_token_url +
>>>>>>> refs/remotes/origin/twitch
=======
exports.Init = function (code) {
    self.code = code;
    var url = g.config.twitch_token_url +
>>>>>>> parent of 2f6e9ea... fuck
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
self.get_auth_url = function() {
=======
self.AuthUrl = function() {
>>>>>>> refs/remotes/origin/twitch
=======
self.get_auth_url = function() {
>>>>>>> refs/remotes/origin/twitch
=======
exports.AuthUrl = function () {
>>>>>>> parent of 2f6e9ea... fuck
    return g.config.twitch_auth_url +
        "?response_type=code" +
        "&client_id=" + g.config.twitch_client_id +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&scope=" + g.config.twitch_scope[0];
<<<<<<< HEAD
<<<<<<< HEAD
};

<<<<<<< HEAD
self.get_auth_url_check = function() {
    return self.url + "?client_id=" + g.config.twitch_client_id + "&oauth_token=" + g.config.twitch_access_token;
}
=======
};
>>>>>>> refs/remotes/origin/twitch
=======
};

self.get_auth_check_url = function() {
    return g.config.twitch_auth_check_url + "?client_id=" + g.config.twitch_client_id + "&oauth_token=" + g.config.twitch_access_token;
};
>>>>>>> refs/remotes/origin/twitch
=======

>>>>>>> parent of 2f6e9ea... fuck
