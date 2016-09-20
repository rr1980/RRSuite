var g = require('../global');

g.router.get('/', function (req, res, next) {
    if (g.twitch_api.isAuth(req, res, next)) {
        res.render('_layout', {
            // content: "index.ejs",
            //model: indexController.model(),
            loadScripts: g.bundler.loadScripts(),
            loadCss: g.bundler.loadCss()
        });
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
});

g.router.get('/twitch*', function(req, res, next) {
    g.twitch_api.set_auth(req, res, next, function() {
        res.redirect("/");
    }, function(msg) {
        console.log(msg);
    });
});


module.exports = g.router;