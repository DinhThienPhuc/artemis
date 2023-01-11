import {
  execAsync,
  logger,
  readJSONFileAsync,
  updateJSONFileAsync,
} from "./base.js";

import Listr from "listr";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import inquirer from "inquirer";

const createProject = async () => {
  clear();

  logger(
    chalk.yellow(
      figlet.textSync("Artemis\n", {
        horizontalLayout: "full",
      })
    )
  );

  const ask = () => {
    const questions = [
      {
        type: "input",
        name: "name",
        message: "Project's name: ",
        validate: (value) => {
          if (!value.length) {
            return "Please enter project's name";
          }
          if (!/^[0-9a-zA-Z\b-]+$/.test(value)) {
            return "Please enter a valid project's name";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "version",
        message: "Version: ",
        default: "1.0.0",
      },
      {
        type: "input",
        name: "description",
        message: "Description: ",
      },
      {
        type: "input",
        name: "author",
        message: "Author: ",
      },
    ];
    return inquirer.prompt(questions);
  };

  const projectInfomation = await ask();

  const tasks = new Listr([
    {
      title: `${chalk.bold.green("CREATE")} project structures & assets\n`,
      task: async () => {
        try {
          return await execAsync(
            `git clone -b develop --single-branch https://github.com/DinhThienPhuc/artemis.git ${projectInfomation.name}`
          );
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
            `${projectInfomation.name}/package.json`,
            (jsonContent) => {
              return {
                ...jsonContent,
                ...projectInfomation,
              };
            }
          );
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    {
      title: `${chalk.bold.yellow("UPDATE")} project's branch\n`,
      task: async () => {
        try {
          await execAsync(
            `cd ./${projectInfomation.name} && git branch -M main && cd ../`
          );
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    {
      title: `${chalk.bold.cyan("INSTALL")} dependencies\n`,
      task: async () => {
        try {
          const resourceConfig = await readJSONFileAsync(
            `./${projectInfomation.name}/_resources/config.json`
          );
          const projectConfig = await readJSONFileAsync(
            `./${projectInfomation.name}/artemis.config.json`
          );
          const resourcePaths = Object.values(resourceConfig).map(
            (config) => `./${projectInfomation.name}/${config.rootPath}`
          );
          const libPaths = Object.values(projectConfig.libs).map(
            (config) => `./${projectInfomation.name}/${config.rootPath}`
          );

          const executor = [
            ...resourcePaths,
            ...libPaths,
            `./${projectInfomation.name}`,
          ].map((path) => execAsync(`cd ${path} && npm i && cd ../../`));

          await Promise.all(executor);
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  ]);

  const startTime = performance.now();
  await tasks.run();
  const endTime = performance.now();

  logger(`🎨🎨🎨 Done in ${((endTime - startTime) / 1000).toFixed(1)}s`);
};

export default createProject;
