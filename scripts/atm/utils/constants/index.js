import os from "os";

export const TARGET_TEXT = "--target=";

export const ENV_TEXT = "--env=";

export const ACTIONS_MAP_WITH_NPM = {
  add: "install",
  remove: "uninstall",
};

export const ERRORS = {
  "-4058": {
    errno: "-4058",
    code: "ENOENT",
    syscall: "stat",
    message: "No such file or directory",
  },
};

export const ANSI_CODES = {
  RESET: "\u001B[0m",
  BLACK: "\u001B[30m",
  RED: "\u001B[31m",
  GREEN: "\u001B[32m",
  LIGHT_YELLOW: "\u001B[93m",
  YELLOW: "\u001B[33m",
  YELLOW_BACKGROUND: "\u001B[43m",
  BLUE: "\u001B[34m",
  PURPLE: "\u001B[35m",
  CYAN: "\u001B[36m",
  WHITE: "\u001B[37m",
  BOLD: "\u001B[1m",
  UNBOLD: "\u001B[21m",
  UNDERLINE: "\u001B[4m",
  STOP_UNDERLINE: "\u001B[24m",
  BLINK: "\u001B[5m",
};

export const IS_ON_WINDOW = os.platform() === "win32";

export const ENVIRONMENT = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
};

export const CONFIG = {
  BASE: "artemis.base.json",
  PROJECT: "artemis.project.json",
};
