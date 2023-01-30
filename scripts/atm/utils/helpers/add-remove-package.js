import { ACTIONS_MAP_WITH_NPM, TARGET_TEXT } from "../constants/index.js";
import { execAsync, readFileAsync } from "./base.js";

import Listr from "listr";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";
import logSymbols from "log-symbols";
import yargs from "yargs/yargs";

const argv = yargs(hideBin(process.argv)).argv;

const addOrRemovePackage = async (action, params) => {
  try {
    // let targets = null;
    // let items = [];

    // const config = await readFileAsync();

    // for (let index = 0; index < params.length; index++) {
    //   const p = params[index];
    //   if (p.includes(TARGET_TEXT)) {
    //     targets = p.split(TARGET_TEXT)[1];
    //     continue;
    //   } else {
    //     items.push(p);
    //   }
    // }

    let targets = argv.target;
    console.log("targets ", targets);
    console.log("argv ", argv);
    const isDevDependencies = !!argv.saveDev;
    const items = [...argv._].pop();

    // items = items.join(" ");

    // if (!targets) {
    //   if (action !== "add") {
    //     spinner.fail(
    //       "Run command for the project only apply for `add` command"
    //     );
    //     return;
    //   }

    //   // No target, run command recursively
    //   const executor = [
    //     execAsync(`npm ${ACTIONS_MAP_WITH_NPM[action]} ${items}`),
    //   ];

    //   Object.keys(config).forEach((appName) => {
    //     if (config[appName].type === "application") {
    //       executor.push(
    //         execAsync(
    //           `cd ./${config[appName].appticationRoot} && npm ${ACTIONS_MAP_WITH_NPM[action]} ${items} && cd ../../`
    //         )
    //       );
    //     }
    //   });

    //   await Promise.all(executor);
    //   spinner.succeed("Add packages for project and all apps successfully");
    //   return;
    // }

    // if (targets === "root") {
    //   // Run command at the root of the project
    //   await execAsync(`npm ${ACTIONS_MAP_WITH_NPM[action]} ${items}`);
    //   spinner.succeed("Add packages for project successfully");
    //   return;
    // }

    // // App spicified, run command at the root of the app folder
    // const appList = targets.split(/[,\s]/).filter((a) => !!config[a]);
    // if (!appList.length) {
    //   spinner.fail("Please provide valid app");
    //   return;
    // }

    // const executor = appList.map((app) => {
    //   return execAsync(
    //     `cd ./${config[app].appticationRoot} && npm ${ACTIONS_MAP_WITH_NPM[action]} ${items} && cd ../../`
    //   );
    // });

    // await Promise.all(executor);
    // spinner.succeed("Add packages for each app successfully");
  } catch (e) {
    // spinner.fail(e);
    console.log("e", e);
  }
};

export default addOrRemovePackage;
