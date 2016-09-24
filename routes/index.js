var g = require('../global');


g.router.get('/', function (req, res, next) {
    g.twitch_api.Auth(req, res, function () {
        require('../sockets/index')(g.io);
        res.render('_layout', {
            // content: "index.ejs",
            //model: indexController.model(),
            loadScripts: g.bundler.loadScripts(),
            loadCss: g.bundler.loadCss()
        });
    }, function (msg) {
        console.log(msg);

    });
});

g.router.get('/twitch*', function (req, res, next) {
    g.twitch_api.set_auth(req, res, next, function () {
        res.redirect("/");
    }, function (msg) {
        console.log(msg);
    });
});


module.exports = g.router;