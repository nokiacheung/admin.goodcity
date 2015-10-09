// this plugin updates config.xml @ variables
// @NAME@, @VERSION@, @URL@
// ENVIRONMENT=production cordova prepare android

module.exports = function(context) {
    var fs = require('fs');
    var path = require('path');
    var rootdir = context["opts"]["projectRoot"];
    var environment = "staging";
    if (process.env.ENVIRONMENT) { environment = process.env.ENVIRONMENT }

    function replace_string_in_file(filename, to_replace, replace_with) {
        var data = fs.readFileSync(filename, 'utf8');
        var result = data.replace(new RegExp(to_replace, "g"), replace_with);
        fs.writeFileSync(filename, result, 'utf8');
    }

    if (rootdir) {
        var app_details_path = path.join(rootdir, "appDetails.json");
        var app_details = JSON.parse(fs.readFileSync(app_details_path, 'utf8'));

        config_xml_path = path.join(rootdir, "config.xml")
        if (fs.existsSync(config_xml_path)) {
            replace_string_in_file(config_xml_path, "@NAME@", app_details[environment].name);
            replace_string_in_file(config_xml_path, "@URL@", app_details[environment].url);
            replace_string_in_file(config_xml_path, "@VERSION@", app_details[environment].version);
        } else {
            console.log("Missing file:" + config_xml_path);
        }
    } else {
        console.log("Missing file:" + config_xml_path);
    }
}
