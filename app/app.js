import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

// Polymorphic relations does not work with this option. https://github.com/emberjs/data/issues/2065
// Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  PUSHER_OPTS: { key: config.APP.PUSHER_API_KEY, connection: {}, logAllEvents: true }
});

loadInitializers(App, config.modulePrefix);

export default App;
