var express = require('express');
var router = express.Router();
var g = require('../global');


//var bundler = require('../scripts/bundler/Bundler_loader');
var bundler = g.bundler;

/* GET home page. */
router.get('/*', function (req, res, next) {


    res.render('_layout', {
        // content: "index.ejs",
        //model: indexController.model(),
        loadScripts: bundler.loadScripts(),
        loadCss: bundler.loadCss()
    });
});

module.exports = router;
