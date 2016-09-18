var g = require('../global');

/* GET users listing. */
g.router.get('/getFollows', function (req, res, next) {
    res.json(g.twitch_api.follows);
});

module.exports = g.router;
