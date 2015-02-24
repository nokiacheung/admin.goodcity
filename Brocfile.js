/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  minifyCSS: { enabled: false },
  minifyJS: { enabled: false },
  vendorFiles: { 'handlebars.js': null }
});

app.import('bower_components/cloudinary/js/jquery.ui.widget.js');
app.import('bower_components/cloudinary/js/jquery.iframe-transport.js');
app.import('bower_components/cloudinary/js/jquery.fileupload.js');
app.import('bower_components/cloudinary/js/load-image.min.js');
app.import('bower_components/cloudinary/js/canvas-to-blob.min.js');
app.import('bower_components/cloudinary/js/jquery.fileupload-process.js');
app.import('bower_components/cloudinary/js/jquery.fileupload-image.js');
app.import('bower_components/cloudinary/js/jquery.fileupload-validate.js');
app.import('bower_components/cloudinary/js/jquery.cloudinary.js');
app.import('bower_components/moment/moment.js');
app.import('bower_components/airbrake-js/airbrake.js');
app.import('bower_components/pickadate/lib/picker.js');
app.import('bower_components/pickadate/lib/picker.date.js');
app.import('bower_components/pickadate/lib/picker.time.js');

app.import("bower_components/pickadate/lib/themes/classic.css");
app.import("bower_components/pickadate/lib/themes/classic.date.css");
app.import("bower_components/pickadate/lib/themes/classic.time.css");

app.import('bower_components/fastclick/lib/fastclick.js');
app.import('bower_components/foundation/js/foundation.min.js');
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

app.import('bower_components/jquery-mockjax/jquery.mockjax.js');

module.exports = app.toTree();
