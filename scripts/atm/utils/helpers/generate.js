import {
  copyFolderAsync,
  execAsync,
  logger,
  readJSONFileAsync,
  updateJSONFileAsync,
} from "./base.js";

import Listr from "listr";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";
import logSymbols from "log-symbols";
import yargs from "yargs/yargs";

const argv = yargs(hideBin(process.argv)).argv;

const generate = async () => {
  let errorMessage = "";
  const appName = argv.app;
  const libName = argv.lib;
  const type = argv.type;

  if (appName && libName) {
    errorMessage = "Please provide only application or library";
  } else if (!appName && !libName) {
    errorMessage = "Please provide at least an application or a library";
  } else if (!type) {
    errorMessage = "Please provide type of application/library";
  }

  if (errorMessage) {
    return logger(logSymbols.error, errorMessage);
  }

  let module = "";
  let name = "";

  if (appName) {
    module = "app";
    name = appName;
  } else if (libName) {
    module = "lib";
    name = libName;
  }

  const tasks = new Listr([
    {
      title: `${chalk.bold.green("CREATE")} ${chalk.bold(name)}\n`,
      task: async () => {
        try {
          await copyFolderAsync(
            `./_resources/${module}-${type}`,
            `./${module}s/${name}`,
            {
              filter: (src) => {
                if (src.indexOf("node_modules") >= 0) {
                  // Ignore node_modules folder
                  return false;
                }
                return true;
              },
            }
          );
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    {
      title: `${chalk.bold.yellow("UPDATE")} ${chalk.bold(
        "tsconfig.base.json"
      )}\n`,
      enabled: () => module === "lib",
      task: async () => {
        try {
          await updateJSONFileAsync("./tsconfig.base.json", (jsonContent) => {
            const newJSONContent = { ...jsonContent };
            newJSONContent.compilerOptions.paths[`@artemis/${name}`] = [
              `libs/${name}/src/index.ts`,
            ];
            return newJSONContent;
          });
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    {
      title: `${chalk.bold.yellow("UPDATE")} ${chalk.bold("package.json")}\n`,
      task: async () => {
        try {
          await updateJSONFileAsync(
            `./${module}s/${name}/package.json`,
            (jsonContent) => {
              return {
                ...jsonContent,
                name,
              };
            }
          );
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    {
      title: `${chalk.bold.yellow("UPDATE")} ${chalk.bold(
        "artemis.config.json"
      )}\n`,
      task: async () => {
        try {
          const config = await readJSONFileAsync("./_resources/config.json");
          const moduleConfig = config[`${module}-${type}`];

          await updateJSONFileAsync("./artemis.config.json", (jsonContent) => {
            const newJSONContent = { ...jsonContent };
            newJSONContent[`${module}s`][name] = {
              ...moduleConfig,
              name,
              srcPath: `${module}s/${name}/src`,
              rootPath: `${module}s/${name}`,
            };

            if (module === "app") {
              newJSONContent[`${module}s`][
                name
              ].actions.run.development.command = `npm start --prefix ./${module}s/${name}`;
            }

            return newJSONContent;
          });
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    {
      title: `${chalk.bold.cyan("INSTALL")} dependencies\n`,
      task: async () => {
        try {
          await execAsync(`cd ./${module}s/${name} && npm i && cd ../../`);
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  ]);

  const startTime = performance.now();
  await tasks.run();
  const endTime = performance.now();

  logger(`🍤🍤🍤 Done in ${((endTime - startTime) / 1000).toFixed(1)}s`);
};

export default generate;
