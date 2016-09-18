
var g = require('../global');


g.router.get('/', function (req, res, next) {
    if (g.rdy) {
        if (g.twitch_api.isAuth()) {

            res.render('_layout', {
                // content: "index.ejs",
                //model: indexController.model(),
                loadScripts: g.bundler.loadScripts(),
                loadCss: g.bundler.loadCss()
            });
        } else {
            res.redirect(g.twitch_api.AuthUrl());
        }
    }
    else {
        res.send('Server not rdy!');
    }
});

g.router.get('/twitch*', function (req, res, next) {
    if (req.query.code !== null) {
        console.log('twitch...: AUTH');
        g.twitch_api.GetToken(req.query.code, res, function (res) {
            g.twitch_api.GetChannelsFollowAsync(function (data) {
                g.twitch_api.follows = data;
                res.redirect("/");
            });
        });
    }
    else {
        console.log('NOPE!!! /index.js /twitch no code in query');
        res.send("NOPE!!! /index.js /twitch no code in query");
    }
});


module.exports = g.router;
