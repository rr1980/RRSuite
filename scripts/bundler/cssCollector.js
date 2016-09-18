var g = require('../../global');
var self = this;

exports.collect = function () {
    var result = self._fromDir(g.config.bundler.css.path, g.config.bundler.css.filter);
    return result;
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
        if (!files.hasOwnProperty(i)) {
            continue;
        }
        var name = dir + '/' + files[i];
        if (g.fs.statSync(name).isDirectory()) {
            self.__fromDir(name, filter, fileList);
        } else if (name.indexOf(filter) >= 0) {
            fileList.push(name);
        }
    }
    return fileList;
};

