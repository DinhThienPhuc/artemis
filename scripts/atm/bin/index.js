#!/usr/bin/env node

var helpers = require("../helpers/index.js");
var fs = require("fs");

var params = process.argv.splice(process.execArgv.length + 3);
var action = process.argv[2];

var APP_TEXT = "--app=";
var LIB_TEXT = "--lib=";

var ACTIONS_MAP_WITH_NPM = {
  add: "install",
  remove: "uninstall",
};

switch (action) {
  case "add":
  case "remove":
    // Add or remove package(s) into specific app
    var app = null;
    var lib = null;
    var items = [];

    for (var index = 0; index < params.length; index++) {
      var p = params[index];
      if (p.includes(APP_TEXT)) {
        app = p.split(APP_TEXT)[1];
        continue;
      }
      if (p.includes(LIB_TEXT)) {
        lib = p.split(LIB_TEXT)[1];
        continue;
      }
      items.push(p);
    }

    items = items.join(" ");

    var command = "";
    if (!app && !lib) {
      command = "npm " + ACTIONS_MAP_WITH_NPM[action] + " " + items;
    }
    if (lib) {
      command =
        "cd ./libs/" +
        lib +
        " && npm " +
        ACTIONS_MAP_WITH_NPM[action] +
        " " +
        items +
        " && cd ../../";
    }
    if (app) {
      command =
        "cd ./apps/" +
        app +
        " && npm " +
        ACTIONS_MAP_WITH_NPM[action] +
        " " +
        items +
        " && cd ../../";
    }

    helpers.exec(command);
    break;

  case "delete":
    // Delete folder, file from specific app
    var app = null;
    var lib = null;
    var items = [];

    for (var index = 0; index < params.length; index++) {
      var p = params[index];
      if (p.includes(APP_TEXT)) {
        app = p.split(APP_TEXT)[1];
        continue;
      }
      if (p.includes(LIB_TEXT)) {
        lib = p.split(LIB_TEXT)[1];
        continue;
      }
      items.push(p);
    }

    var paths = items.map(function (i) {
      if (!app && !lib) {
        return "./" + i;
      }
      if (app) {
        return "./apps/" + app + "/" + i;
      }
      if (lib) {
        return "./libs/" + lib + "/" + i;
      }
      return "";
    });
    paths.forEach(function (p) {
      fs.rm(p, { recursive: true }, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });

    break;

  default:
    // Default case: atm wil be treated as a npm's alias
    helpers.exec("npm " + args.join(" "));
    break;
}
