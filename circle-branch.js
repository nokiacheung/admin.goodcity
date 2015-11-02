// Script to switch the shared-goodcity branch to the same branch as this project
// Aims to be platform independent with minimal requirements.
// Requirements: nodejs, git, github

var fs = require('fs');
var https = require('https');
var sharedGoodCityRepo = 'crossroads/shared.goodcity';
var packageJsonFile = 'package.json';
var defaultBranch = 'master';

var execSync = require("child_process").execSync;
function exec(cmd) {
  return execSync(cmd, {encoding:"utf8"});
}

var currentBranch = exec('git rev-parse --abbrev-ref HEAD').trim() || defaultBranch;
var branches = '';
var options = {
  host: 'api.github.com',
  port: 443,
  path: '/repos/' + sharedGoodCityRepo + '/branches',
  headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
};
https.get(options, function(res) {
  var data = '';
  res.on('data', function(d) {
    data += d;
  });
  res.on('end', function() {
    setBranch(data);
  });
}).on('error', function(e) {
  console.error(e);
});

function setBranch(branches) {
  var matched = JSON.parse(branches)
    .map(function(b) { return b.name; })
    .filter(function(name) { return name.indexOf(currentBranch) == 0; });

  var branchToUse = matched[0] || defaultBranch;
  console.log(sharedGoodCityRepo + " using " + branchToUse);

  var sharedGoodCityPackage = "git://github.com/" + sharedGoodCityRepo + ".git#" + branchToUse
  var packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'));
  packageJson['dependencies']['shared-goodcity'] = sharedGoodCityPackage;
  fs.writeFile(packageJsonFile, JSON.stringify(packageJson, null, 2), function(err) {
      if(err) {
        console.log(err);
      }
  });
}
