var execSync = require("child_process").execSync;
var repoName = process.argv[2];

function exec(cmd) {
  return execSync(cmd, {encoding:"utf8"});
}

var currentBranch = exec("git rev-parse --abbrev-ref HEAD");
currentBranch = (/GCW-\d+/.exec(currentBranch) || [])[0];
if (!currentBranch) {
  console.log("shared.goodcity using master");
  return;
}

var branches = exec("curl https://api.github.com/repos/crossroads/" + repoName + "/branches");
var matched = JSON.parse(branches)
  .map(function(b) { return b.name; })
  .filter(function(name) { return name.indexOf(currentBranch) !== -1; })[0];

if (!matched) {
  console.log("shared.goodcity using master");
  return;
}

console.log("shared.goodcity using " + matched);
exec("sed -i 's/shared\.goodcity\.git/shared.goodcity.git#'" + matched + "'/g' package.json");
