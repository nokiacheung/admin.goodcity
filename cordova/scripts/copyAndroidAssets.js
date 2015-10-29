// this plugin copies Android drawable-* assets

module.exports = function(context) {
    var fs = require('fs');
    var path = require('path');
    var rootdir = context["opts"]["projectRoot"];

    var filestocopy = [{
            "res/android/drawable-ldpi/ic_notify.png":
            "platforms/android/res/drawable-ldpi/ic_notify.png"
        }, {
            "res/android/drawable-mdpi/ic_notify.png":
            "platforms/android/res/drawable-mdpi/ic_notify.png"
        }, {
            "res/android/drawable-hdpi/ic_notify.png":
            "platforms/android/res/drawable-hdpi/ic_notify.png"
        }, {
            "res/android/drawable-xhdpi/ic_notify.png":
            "platforms/android/res/drawable-xhdpi/ic_notify.png"
        }, {
            "res/android/drawable-xxhdpi/ic_notify.png":
            "platforms/android/res/drawable-xxhdpi/ic_notify.png"
        }, {
            "res/android/drawable-xxxhdpi/ic_notify.png":
            "platforms/android/res/drawable-xxxhdpi/ic_notify.png"
        }, {
            "res/android/drawable-ldpi/ic_notify.png":
            "platforms/android/res/drawable-ldpi/ic_stat_notify.png"
        }, {
            "res/android/drawable-mdpi/ic_notify.png":
            "platforms/android/res/drawable-mdpi/ic_stat_notify.png"
        }, {
            "res/android/drawable-hdpi/ic_notify.png":
            "platforms/android/res/drawable-hdpi/ic_stat_notify.png"
        }, {
            "res/android/drawable-xhdpi/ic_notify.png":
            "platforms/android/res/drawable-xhdpi/ic_stat_notify.png"
        }, {
            "res/android/drawable-xxhdpi/ic_notify.png":
            "platforms/android/res/drawable-xxhdpi/ic_stat_notify.png"
        }, {
            "res/android/drawable-xxxhdpi/ic_notify.png":
            "platforms/android/res/drawable-xxxhdpi/ic_stat_notify.png"
        }
    ];

    filestocopy.forEach(function(obj) {
      Object.keys(obj).forEach(function(key) {
          var val = obj[key];
          var srcfile = path.join(rootdir, key);
          var destfile = path.join(rootdir, val);
          // console.log("copying "+srcfile+" to "+destfile);
          var destdir = path.dirname(destfile);
          if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
              fs.createReadStream(srcfile).pipe(
                 fs.createWriteStream(destfile));
          }
      });
    });
}
