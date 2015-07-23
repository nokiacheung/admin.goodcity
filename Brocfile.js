/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var webRelease = process.env.EMBER_CLI_CORDOVA === '0' && ['production', 'staging'].indexOf(process.env.EMBER_ENV) !== -1;

var app = new EmberApp({
  vendorFiles: { 'handlebars.js': null },
  sourcemaps: ['js', 'css'],
  fingerprint: {
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map'],
    enabled: webRelease
  },
  gzip: {
    keepUncompressed: true,
    extensions: ['js', 'css', 'map', 'ttf', 'ott', 'eot', 'svg'],
    enabled: webRelease
  }
});

app.import('bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js');
app.import('bower_components/blueimp-file-upload/js/jquery.iframe-transport.js');
app.import('bower_components/blueimp-file-upload/js/jquery.fileupload.js');
app.import('bower_components/cloudinary/js/load-image.min.js');
app.import('bower_components/cloudinary/js/canvas-to-blob.min.js');
app.import('bower_components/blueimp-file-upload/js/jquery.fileupload-process.js');
app.import('bower_components/blueimp-file-upload/js/jquery.fileupload-image.js');
app.import('bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js');
app.import('bower_components/cloudinary/js/jquery.cloudinary.js');

app.import('bower_components/moment/moment.js');
app.import('bower_components/moment/locale/zh-tw.js');
app.import('bower_components/airbrake-js/dist/client.js');
app.import('bower_components/pickadate/lib/picker.js');
app.import('bower_components/pickadate/lib/picker.date.js');
app.import('bower_components/pickadate/lib/picker.time.js');

app.import("bower_components/pickadate/lib/themes/default.css");
app.import("bower_components/pickadate/lib/themes/default.date.css");
app.import("bower_components/pickadate/lib/themes/default.time.css");

// please include individual foundation js as needed
// tabs js if included throws error on keypress when tab has focus
app.import('bower_components/foundation/js/foundation/foundation.js');
app.import('bower_components/foundation/js/foundation/foundation.offcanvas.js');
app.import('bower_components/foundation/js/foundation/foundation.reveal.js');
app.import('bower_components/foundation/js/foundation/foundation.topbar.js');

// app.import('bower_components/fastclick/lib/fastclick.js');
app.import('bower_components/jquery-placeholder/jquery.placeholder.js');
app.import('bower_components/jquery.cookie/jquery.cookie.js');
app.import('bower_components/modernizr/modernizr.js');
app.import('bower_components/jquery-timeago/jquery.timeago.js');
app.import('bower_components/socket.io-client/socket.io.js');

app.import('bower_components/handlebars/handlebars.runtime.js');
app.import('bower_components/ember-i18n/lib/i18n.js');
app.import('bower_components/ember-i18n/lib/i18n-plurals.js');

app.import('bower_components/lightgallery/light-gallery/css/lightGallery.css');
app.import('bower_components/lightgallery/light-gallery/js/lightGallery.js');
app.import('bower_components/lightgallery/light-gallery/img/loading.gif', {
  destDir: '/img'
});


app.import({
  development: 'bower_components/ember-data/ember-data.js',
  production:  'bower_components/ember-data/ember-data.prod.js'
  }, { exports: {
        'ember-data': ['default']
      }
});
app.import({
  development: 'bower_components/ember-data-factory-guy/dist/ember-data-factory-guy.js',
  test: 'bower_components/ember-data-factory-guy/dist/ember-data-factory-guy.js'
  }, {  destDir: 'assets/',
      exports: {
        'FactoryGuy': ['default']
  }
});

app.import({
  development: 'bower_components/ember-data-factory-guy/dist/factory_guy_has_many.js',
  test: 'bower_components/ember-data-factory-guy/dist/factory_guy_has_many.js',
  }, {  destDir: 'assets/',
      exports: {
        'FactoryGuyHasMany': ['default']
  }
});

app.import({test:'bower_components/jquery-mockjax/jquery.mockjax.js'});

module.exports = app.toTree();
