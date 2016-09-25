var g = require('../global');


g.router.get('/', function (req, res, next) {

    if (g.twitch_api.Auth(req, res)) {
        res.render('_layout', {
            // content: "index.ejs",
            //model: indexController.model(),
            loadScripts: g.bundler.loadScripts(),
            loadCss: g.bundler.loadCss()
        });
    }else{
        console.log('twitch...: login fail!');
        
    }
    // if (g.twitch_api.Auth(req, res)) {
    //     res.render('_layout', {
    //         // content: "index.ejs",
    //         //model: indexController.model(),
    //         loadScripts: g.bundler.loadScripts(),
    //         loadCss: g.bundler.loadCss()
    //     });
    // }
    // else {
    //     console.log('twitch...: new Auth');
    //     res.redirect(g.twitch_api.get_auth_url());

    // }

    // g.twitch_api.Auth(req, res, function () {
    //     require('../sockets/index')(g.io);
    //     res.render('_layout', {
    //         // content: "index.ejs",
    //         //model: indexController.model(),
    //         loadScripts: g.bundler.loadScripts(),
    //         loadCss: g.bundler.loadCss()
    //     });
    // }, function (msg) {
    //     console.log(msg);
    // });

});

// g.router.get('/twitch*', function (req, res, next) {
//     // g.twitch_api.set_auth(req, res, next, function () {
//     //     res.redirect("/");
//     // }, function (msg) {
//     //     console.log(msg);
//     // });
// });


module.exports = g.router;