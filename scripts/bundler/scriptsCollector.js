var path = require('path'), fs = require('fs');
var global = require('../../global');
var config = global.config;
var self = this;

exports.collect = function () {
    var prio = self.reverseArr(config.bundler.scripts.priority);
    var result = self._fromDir(config.bundler.scripts.path, config.bundler.scripts.filter);

    for (var p in prio) {
        for (var r in result) {
            var index = result[r].indexOf(prio[p]);
            if (index >= 0) {
                var j = result[r];
                result.splice(r, 1);
                result.unshift(j);
            }
        }
    }

    var exec = config.bundler.scripts.exception;

    for (var e in exec) {
        for (var r in result) {
            var indexe = result[r].indexOf(exec[e]);
            if (indexe >= 0) {
                result.splice(r, 1);
            }
        }
    }
    return result;
}

self.reverseArr = function (input) {
    var ret = new Array;
    for (var i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}

self._fromDir = function (dir, filter) {
    'use strict';
    var f = [];
    var col = self.__fromDir(dir, filter);
    for (var i in col) {
        f.push(col[i].substring(8));
    }
    return f;
}


self.__fromDir = function (dir, filter, fileList) {
    fileList = fileList || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        if (!files.hasOwnProperty(i)) continue;
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            self.__fromDir(name, filter, fileList);
        } else if (name.indexOf(filter) >= 0) {
            //var ttt = name.indexOf(config.bundler.scripts.exception);
            fileList.push(name);
        }
    }
    return fileList;
}

