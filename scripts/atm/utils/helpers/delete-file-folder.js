import { IS_ON_WINDOW, TARGET_TEXT } from "../constants/index.js";
import { readFileAsync, removeAsync } from "./base.js";

import ora from "ora";

const deleteFileOrFolder = async (params) => {
  // Delete folder, file from specific app
  const spinner = ora({
    text: "Deleting files/folders. Please wait ...\n",
    spinner: IS_ON_WINDOW ? "line" : "aesthetic",
  }).start();

  try {
    let target = null;
    const items = [];

    const config = await readFileAsync();

    for (let index = 0; index < params.length; index++) {
      const p = params[index];
      if (p.includes(TARGET_TEXT)) {
        target = p.split(TARGET_TEXT)[1];
      } else {
        items.push(p);
      }
    }

    const executor = [];
    for (let index = 0; index < items.length; index++) {
      const i = items[index];
      if (!target) {
        spinner.fail(
          "Please specify the app/lib/root contains those files/folders"
        );
        return;
      }
      if (target === "root") {
        executor.push(removeAsync(`./${i}`));
        continue;
      }
      if (!config[target]?.appticationRoot) {
        spinner.fail(
          "Target doesn't exist. Please provide a valid target (app  or library)."
        );
        return;
      }
      executor.push(removeAsync(`./${config[target]?.appticationRoot}/${i}`));
    }

    await Promise.all(executor);
    spinner.succeed("Delete files/folders success");
  } catch (e) {
    spinner.fail(e);
  }
};

export default deleteFileOrFolder;
