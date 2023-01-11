#!/usr/bin/env node
/* eslint-disable indent */

import addOrRemovePackage from "../utils/helpers/add-remove-package.js";
import createSystem from "../utils/helpers/create-system.js";
import deleteFileOrFolder from "../utils/helpers/delete-file-folder.js";
import { execAsync } from "../utils/helpers/base.js";
import generate from "../utils/helpers/generate.js";
import runApps from "../utils/helpers/run-app.js";

const params = process.argv.splice(process.execArgv.length + 3);
const action = process.argv[2];

switch (action) {
  // NOTE: run this at global scope
  case "create-artemis-system":
    createSystem();
    break;

  // NOTE: run those commands at the root of the project
  case "gen":
    generate();
    break;

  case "add":
  case "remove":
    addOrRemovePackage(action, params);
    break;

  case "delete":
    deleteFileOrFolder(params);
    break;

  case "run":
    runApps(params);
    break;

  default:
    // Default case: atm wil be treated as a npm's alias
    execAsync("npm " + params.join(" "));
    break;
}
