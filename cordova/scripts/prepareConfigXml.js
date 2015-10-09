// this plugin updates config.xml @ variables
// @NAME@, @VERSION@, @URL@
// ENVIRONMENT=production cordova prepare android

module.exports = function(context) {
    var fs = require('fs');
    var xml2js = require('xml2js');
    var path = require('path');
    var rootdir = context["opts"]["projectRoot"];
    var environment = "staging";
    if (process.env.ENVIRONMENT) { environment = process.env.ENVIRONMENT }

    if (rootdir) {
        var app_details_path = path.join(rootdir, "appDetails.json");
        var app_details = JSON.parse(fs.readFileSync(app_details_path, 'utf8'));
        // app_details[environment].url
        // app_details[environment].version
        config_xml_path = path.join(rootdir, "config.xml");
        if (fs.existsSync(config_xml_path)) {
            // var data = fs.readFileSync(config_xml_path, 'utf8');
            var parser = new xml2js.Parser();
            fs.readFile(config_xml_path, function(err, data) {
                parser.parseString(data, function (err, result) {
                    result.widget.name = app_details[environment].name;
                    // fs.writeFileSync(config_xml_path, result, 'utf8');
                    console.log(result)
                });
            });
        } else {
            console.log("Missing file:" + config_xml_path);
        }
    } else {
        console.log("Can't find config files... aborting");
    }
}
