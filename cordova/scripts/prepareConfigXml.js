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
        config_xml_path = path.join(rootdir, "config.xml");
        if (fs.existsSync(config_xml_path)) {
            var parser = new xml2js.Parser();
            fs.readFile(config_xml_path, 'utf8', function(err, xmlStr) {
                if (err) throw err;
                parser.parseString(xmlStr, function (err, result) {
                    if (err) throw err;
                    result.widget.name = app_details[environment].name;
                    result.widget.$.id = app_details[environment].url;
                    result.widget.$.version = app_details[environment].version;
                    var builder = new xml2js.Builder();
                    var xml = builder.buildObject(result);
                    fs.writeFileSync(config_xml_path, xml, 'utf8');
                });
            });
        } else {
            console.log("Missing file:" + config_xml_path);
        }
    } else {
        console.log("Can't find config files... aborting");
    }
}
