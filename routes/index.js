
var g = require('../global');


g.router.get('/', function (req, res, next) {
    if (g.config.rdy) {

        if (g.config.twitch.access_token !== "") {
            
            res.render('_layout', {
                // content: "index.ejs",
                //model: indexController.model(),
                twitch_follows: g.twitch_api.GetChannelsFollow(),
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
        g.config.twitch.code = req.query.code;
        console.log('twitch...: AUTH');
        g.twitch_api.GetToken(res, function(res){
            res.redirect("/");
        });
    }
    else {
        console.log('NOPE!!! /index.js /twitch no code in query');
        res.send("NOPE!!! /index.js /twitch no code in query");
    }
});


module.exports = g.router;
