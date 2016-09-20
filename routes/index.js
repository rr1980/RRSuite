
var g = require('../global');


<<<<<<< HEAD
g.router.get('/', function(req, res, next) {
    g.twitch_api.Auth(req, res, function() {
        res.render('_layout', {
            // content: "index.ejs",
            //model: indexController.model(),
            loadScripts: g.bundler.loadScripts(),
            loadCss: g.bundler.loadCss()
        });
<<<<<<< HEAD
    }


});

g.router.get('/', function(req, res, next) {
    g.twitch_api.Auth(req, res, function() {
        res.render('_layout', {
            // content: "index.ejs",
            //model: indexController.model(),
            loadScripts: g.bundler.loadScripts(),
            loadCss: g.bundler.loadCss()
        });
    }, function(msg) {
        console.log(msg);

<<<<<<< HEAD
    });
=======
            res.render('_layout', {
                // content: "index.ejs",
                //model: indexController.model(),
                loadScripts: g.bundler.loadScripts(),
                loadCss: g.bundler.loadCss()
            });
        }
    }
    else {
        res.send('Server not rdy!');
    }
>>>>>>> refs/remotes/origin/twitch
=======
    }, function(msg) {
        console.log(msg);

    });
>>>>>>> refs/remotes/origin/twitch
=======
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
>>>>>>> parent of 2f6e9ea... fuck
});

g.router.get('/twitch*', function (req, res, next) {
    if (req.query.code !== null) {
        g.twitch_api.Init(req.query.code);
        res.redirect("/");
    }
    else {
        console.log('NOPE!!! /index.js /twitch no code in query');
        res.send("NOPE!!! /index.js /twitch no code in query");
    }
});


module.exports = g.router;
