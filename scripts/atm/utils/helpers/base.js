import childProcess from "child_process";
import detectIndent from "detect-indent";
import fs from "fs";
import fsExtra from "fs-extra";
import util from "util";

export const execAsync = util.promisify(childProcess.exec);

export const capitalized = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const removeAsync = (path) => {
  return new Promise((resolve) => {
    fs.rm(path, { recursive: true }, () => {
      resolve();
    });
  });
};

export const readFileAsync = (path, options = { encoding: "utf8" }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (error, data) => {
      if (error) {
        reject("");
      }
      resolve(data);
    });
  });
};

export const writeFileAsync = (path, data = "") => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        reject();
      }
      resolve();
    });
  });
};

export const readJSONFileAsync = async (path) => {
  try {
    const jsonStr = await readFileAsync(path);
    return JSON.parse(jsonStr);
  } catch (error) {
    return null;
  }
};

export const updateJSONFileAsync = async (path, modifier) => {
  try {
    const jsonStr = await readFileAsync(path);

    const indent = detectIndent(jsonStr).indent || "    ";

    const newJSONContent = modifier?.(JSON.parse(jsonStr));

    return await writeFileAsync(
      path,
      JSON.stringify(newJSONContent, undefined, indent)
    );
  } catch (error) {
    return null;
  }
};

// eslint-disable-next-line no-console
export const logger = console.log;

export const copyFolderAsync = (from, to, options) => {
  return new Promise((resolve, reject) => {
    fsExtra.copy(from, to, options, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
