/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 2, maxerr: 50 */
/*global define, $, brackets */

/** Simple extension that adds a "File > Hello World" menu item. Inserts "Hello, world!" at cursor pos. */
define(function (require, exports, module) {
  "use strict";

  var PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
    PreferencesBase = brackets.getModule("preferences/PreferencesBase"),
    NodeDomain = brackets.getModule("utils/NodeDomain"),
    ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
    DocumentManager = brackets.getModule("document/DocumentManager");

  var jadeDomain = new NodeDomain("jadeDomain", ExtensionUtils.getModulePath(module, "node/JadeDomain"));
  var prefs = PreferencesManager.getExtensionPrefs("myjade");
  var stateManager = PreferencesManager.stateManager.getPrefixedSystem("myjade");

  prefs.definePreference("option", "object", {});
  prefs.definePreference("enabled", "boolean", true);
  prefs.definePreference("pretty", "boolean", false);

  prefs.on("change", function () {
    console.log("Preferences changed ", prefs.get("enabled"));
  });


  function renderFile(fullpath) {

    if (prefs.get("enabled")) {
      var options = prefs.get("options");

      jadeDomain.exec("compileJade", fullpath, {"pretty": options.pretty, "outputDir": options.outputDir})
        .done(function (msg) {
          console.log("Success: " + msg);
        }).fail(function (err) {
          console.log("Error: " + err);
        });
    }
  }

  DocumentManager.on("documentSaved", function (event, file) {
    var fullpath = file.file.fullPath;
    var filename = file.file.name;

    if (filename.match(/\.(jade|pug)/)) {
      renderFile(fullpath);
    }
  });
});
