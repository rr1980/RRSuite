﻿var g = require('../../global');
var self = this;

exports.collect = function () {
    var prio = self.reverseArr(g.config.bundler_scripts_priority);
    var result = self._fromDir(g.config.bundler_scripts_path, g.config.bundler_scripts_filter);

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

    var exec = g.config.bundler_scripts_exception;

    for (var e in exec) {
        for (var u in result) {
            var indexe = result[u].indexOf(exec[e]);
            if (indexe >= 0) {
                result.splice(u, 1);
            }
        }
    }
    return result;
};

self.reverseArr = function (input) {
    var ret = new Array([]);
    for (var i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
};

self._fromDir = function (dir, filter) {
    'use strict';
    var f = [];
    var col = self.__fromDir(dir, filter);
    for (var i in col) {
        f.push(col[i].substring(8));
    }
    return f;
};


self.__fromDir = function (dir, filter, fileList) {
    fileList = fileList || [];
    var files = g.fs.readdirSync(dir);
    for (var i in files) {
        if (!files.hasOwnProperty(i))
        { continue; }
        var name = dir + '/' + files[i];
        if (g.fs.statSync(name).isDirectory()) {
            self.__fromDir(name, filter, fileList);
        } else if (name.indexOf(filter) >= 0) {
            fileList.push(name);
        }
    }
    return fileList;
};

