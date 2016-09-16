exports.io = {};
exports.socketsbase ={};

var fs = require('fs');
var _config = require("./config.json");
// var _io = require('socket.io');
var self = this;

Object.observe(_config, function (changes) {
    console.log("global...: save config changes...");
    self._save();
})

self._save = function () {
    var data = JSON.stringify(self.config);
    fs.writeFile('./config.json', data, function (err) {
        if (err) {
            console.log('There has been an error saving your configuration data.');
            console.log(err.message);
            return;
        }
        console.log('Configuration saved successfully.')
    });
}


exports.config = _config;

var _bundler = require('./scripts/bundler/Bundler_loader');
exports.bundler = _bundler;

console.log("global...: initialisiert");