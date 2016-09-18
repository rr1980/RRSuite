exports.io = {};
exports.socketsbase = {};


var fs = require('fs');
var _config = require("./config.json");
_config.rdy = false;
var self = this;

Object.observe(_config, function (changes) {
    if (changes[0].name !== "rdy") {
        console.log("global...: save config changes...");
        self._save();
    }
});

self._save = function () {
    var data = JSON.stringify(self.config);
    fs.writeFile('./config.json', data, function (err) {
        if (err) {
            console.log('There has been an error saving your configuration data.');
            console.log(err.message);
            return;
        }
        console.log('Configuration saved successfully.');
    });
};

exports.config = _config;

var _express = require('express');
exports.express = require('express');
exports.router = _express.Router();

var _request = require('request');
exports.request = _request;

exports.fs = require('fs');
exports.path = require('path');
exports.logger = require('morgan');
exports.cookieParser = require('cookie-parser');
exports.bodyParser = require('body-parser');
exports.index = require('./routes/index');
exports.get = require('./routes/get');
exports.request_Sync = require('sync-request');

var _bundler = require('./scripts/bundler/Bundler_loader');
exports.bundler = _bundler;
var _twitch_api = require("./scripts/twitch/twitch_api");
exports.twitch_api = _twitch_api;

// _config.twitch.channel_follow = _twitch_api.Auth();

console.log("global...: initialisiert");
_config.rdy = true;