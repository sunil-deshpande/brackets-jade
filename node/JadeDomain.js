/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 2, maxerr: 50 */
/*global define, $, brackets, require, exports*/

(function () {
  'use strict';
  var jade = require('pug'),
    fs = require('fs'),
    path = require('path');
  /**
  * @private
  * Handler function for jadeCompile.
  * @param {string} path name
  * @param {options} options for conversion
  */
  function compileJade(fullpath, options) {
    //Components of path of output file
    var htmlFileName;
    var directory = path.dirname(fullpath);
    var basename = path.basename(fullpath);
    var htmlName = basename.replace(/\.(jade|pug)$/, '.html');
    var jadeContent = fs.readFileSync(fullpath, 'utf8');
    var fn = jade.compile(jadeContent, {filename: fullpath, pretty: options.pretty});
    var html = fn('En_US');
    //Convert path  to file depending on outputDir option
    if (path.isAbsolute(options.outputDir)) {
      htmlFileName = path.normalize(path.join(options.outputDir, htmlName));
    } else {
      htmlFileName = path.normalize(path.join(directory, options.outputDir, htmlName));
    }
    console.log(htmlFileName);
    fs.writeFileSync(htmlFileName, html);
  }
  /**
   * Initializes the test domain with several test commands.
   * @param {DomainManager} domainManager The DomainManager for the server
   */
  function init(domainManager) {
    if (!domainManager.hasDomain("jadeDomain")) {
      domainManager.registerDomain("jadeDomain", {major: 0, minor: 1});
    }
    domainManager.registerCommand(
      "jadeDomain",
      "compileJade",
      compileJade,
      false,
      "Converts Jade file to Html on save. ",
      [{name: "pathname", // Command Parameters
        type: "string",
        description: "Transfer name of the file"}, {
        name: "options",
        type: "JSON",
        description: "Options required by comfileFile function"
      }]
    );
  }
  exports.init = init;
}());
