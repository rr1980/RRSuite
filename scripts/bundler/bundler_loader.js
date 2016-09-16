var scriptsCollector = require('./scriptsCollector');
var cssCollector = require('./cssCollector');

module.exports = {
    loadScripts: function () {
        var scriptContent = "";
        var scripts = scriptsCollector.collect();
        for (var i in scripts) {
            scriptContent += "\r\n\<script src=\"" + scripts[i] + "\"\>\</script\>";
        }
        return scriptContent;
    },

    loadCss: function () {
        var cssContent = "";
        var css = cssCollector.collect();
        for (var i in css) {
            cssContent += "\r\n\<link rel='stylesheet' href='" + css[i] + "'\/>";
        }
        return cssContent;
    }
}



