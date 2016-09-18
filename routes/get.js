var g = require('../global');

/* GET users listing. */
g.router.get('/getFollows', function (req, res, next) {
    res.json(g.config.twitch.follows);
});

module.exports = g.router;
