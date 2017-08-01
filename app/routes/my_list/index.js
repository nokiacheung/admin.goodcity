import AuthorizeRoute from './../authorize';
import config from '../../config/environment';

export default AuthorizeRoute.extend({
  isCordovaApp: config.cordova.enabled,

  iOS() {
    var iDevices = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ];

    if (!!navigator.platform) {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){ return true; }
      }
    }

    return false;
  },

  model() {
    if(!this.get("isCordovaApp") && !this.iOS()){
      this.requestDesktopNotificationPermission();
    }
    return this.transitionTo('my_list.reviewing');
  },

  requestDesktopNotificationPermission(){
    if(Notification && Notification.permission === 'default') {
      Notification.requestPermission(function (permission) {
        if(!('permission' in Notification)) {
          Notification.permission = permission;
        }
      });
    }
  }
});
