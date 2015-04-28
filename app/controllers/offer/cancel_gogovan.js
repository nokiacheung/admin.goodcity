import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  canCancel: Ember.computed.alias('model.delivery.gogovanOrder.isCancelled'),
  driverContact: Ember.computed.alias('model.delivery.gogovanOrder.driverMobile'),
  gogovanContact: config.APP.GOGOVAN_CONTACT
});
