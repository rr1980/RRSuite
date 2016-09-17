exports.io = {};
exports.socketsbase = {};

var fs = require('fs');
var _config = require("./config.json");

var self = this;

Object.observe(_config, function (changes) {
    console.log("global...: save config changes...");
    self._save();
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

var _request = require('request');
exports.request = _request;
var _bundler = require('./scripts/bundler/Bundler_loader');
exports.bundler = _bundler;
var _twitch_api = require("./scripts/twitch/twitch_api");
exports.twitch_api = _twitch_api;



_twitch_api.GetChannelsFollow(function (result) {
    console.log("AYE: " + result);
});





console.log("global...: initialisiert");
_config.rdy=true;