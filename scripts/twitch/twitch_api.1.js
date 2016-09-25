var g = require('../../global.js');
var async = require("async");
var self = this;
self.code = "";

exports.follows = {};
var old_follows = {};

exports.state = {
    auth: false,
    token: false
};
var it;

exports.onChangeFollows = function () { };
// exports.onChangeFollows=function(what,cb){
//     for(var i in onChange){
//         if(onChange[i].what===what){
//             return;
//         }
//     }
//     onChange.push({what:what,cb:cb});
// }

exports.Auth = function (req, res, sucess, fail) {
    if (self.state.auth !== true || self.state.token !== true) {
        res.redirect(self.get_auth_url());
    } else {
        self.Timer();
        sucess();
    }
};

exports.set_auth = function (req, res, next, sucess, fail) {
    if (req.query.code !== null) {
        self.code = req.query.code;
        self.get_auth(sucess, fail);

    } else {
        fail("in set_auth");
        console.log('NOPE!!! /twitch_api.js /twitch no code in query');
        res.send("NOPE!!! /twitch_api.js /twitch no code in query");
    }

};

self.UpdateFollowAsync = function () {
    g.request(self.get_follower_url(), function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var r = JSON.parse(body);
            self.follows = r.streams;
            self.games();
            console.log('twitch...: sync rdy');
        } else {
            console.log("ERROR............: " + JSON.stringify(error));
            console.log(body);
            if (response.statusCode === 401) {
                self.Init();
            }
        }
    });
};

function compare() {
    if (old_follows !== self.follows) {
        if (old_follows.length !== self.follows.length) {
            return true;
        } else {
            for (var i in self.follows) {
                var newF = self.follows[i];
                var oldF = old_follows[i];
                if (oldF.game !== newF.game) {
                    return true;
                }
                if (oldF.viewers !== newF.viewers) {
                    return true;
                }
                if (oldF.channel.display_name !== newF.channel.display_name) {
                    return true;
                }
            }
        }
    }
    return false;
};

// var zz = 0;
// function _reg() {
//     zz++;
//     console.log(zz + " - " + self.follows.length);

//     if (zz === self.follows.length) {
//         if (compare()) {
//             old_follows = self.follows;
//             console.log('twitch...: sync change');
//             self.onChangeFollows();
//         }
//     }
// }

self.games = function () {
    var zz = 0;
    for (var i in self.follows) {
        // var item = self.follows[i];
        var result = g.request_Sync("GET", self.get_games_url(self.follows[i]));
        // g.request(self.get_games_url(self.follows[i]), function (error, response, body) {
        if (result.statusCode === 200) {
            var r = JSON.parse(result.body);
            self.follows[i].gameData = r.games[0];
        } else {
            console.log("ERROR............: " + JSON.stringify(error));
            console.log(body);
        }
    }
    if (compare()) {
        old_follows = self.follows;
        console.log('twitch...: sync change');
        self.onChangeFollows();
    }

};

self.Timer = function () {
    if (it === undefined) {
        self.UpdateFollowAsync();
        it = setInterval(function () {
            self.UpdateFollowAsync();
        }, 15 * 1000);  //60 * 1000
    }
};

self.get_auth = function (sucess, fail) {
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

self.Init = function () {
    var receive = g.request_Sync("GET", self.get_auth_check_url());
    var result = JSON.parse(receive.body);

    if (result.identified === true) {
        self.state.auth = true;
        if (result.token.valid === true) {
            self.state.token = true;
            self.Timer();
        } else {
            self.state.token = false;
        }
    } else {
        self.state.auth = false;
    }
};
 
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
        "?client_id=" + g.config.twitch_client_id +
        "&client_secret=" + g.config.twitch_client_secret +
        "&grant_type=authorization_code" +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&code=" + self.code;
};
 
self.get_auth_url = function() {
    return g.config.twitch_auth_url +
        "?response_type=code" +
        "&client_id=" + g.config.twitch_client_id +
        "&redirect_uri=" + g.config.twitch_redirect_uri +
        "&scope=" + g.config.twitch_scope[0];
};
 
self.get_auth_check_url = function() {
    return g.config.twitch_auth_check_url + "?client_id=" + g.config.twitch_client_id + "&oauth_token=" + g.config.twitch_access_token;
};