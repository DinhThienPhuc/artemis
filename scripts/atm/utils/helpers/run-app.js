import {
  ENVIRONMENT,
  ENV_TEXT,
  IS_ON_WINDOW,
  TARGET_TEXT,
} from "../constants/index.js";
import { execAsync, readFileAsync } from "./base.js";

import ora from "ora";

const runApps = async (params) => {
  try {
    let targets = null;
    let env = ENVIRONMENT.DEVELOPMENT;
    const config = await readFileAsync();

    for (let index = 0; index < params.length; index++) {
      const p = params[index];

      if (p.includes(TARGET_TEXT)) {
        targets = p.split(TARGET_TEXT)[1];
        continue;
      }

      if (p.includes(ENV_TEXT)) {
        env = p.split(ENV_TEXT)[1];
        continue;
      }
    }

    const appList = targets.split(/[,\s]/);

    ora({
      text: "Starting app(s) ...",
      spinner: IS_ON_WINDOW ? "line" : "aesthetic",
    }).start();

    const executor = appList.map((app) => {
      const port = config[app].actions["run"][env]["port"];
      const cmd = config[app].actions["run"][env]["command"];
      return execAsync(`PORT=${port} ${cmd}`);
    });

    await Promise.all(executor);
  } catch (e) {
    // console.error(e);
  }
};

export default runApps;
