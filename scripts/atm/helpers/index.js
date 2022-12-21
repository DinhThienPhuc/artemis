var childProcess = require("child_process");

var exec = function (command) {
  try {
    childProcess.execSync(command, { stdio: "inherit" });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

exports.exec = exec;
