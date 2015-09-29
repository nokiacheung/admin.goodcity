import FactoryGuy from 'ember-data-factory-guy';
import config from '../../config/environment';
import '../factories/territory';
import '../factories/address';
import '../factories/contact';
import '../factories/schedule';
import '../factories/delivery';
import '../factories/gogovan_order';
import '../factories/offer';
import '../factories/package_type';
import '../factories/package';
import '../factories/donor_condition';
import '../factories/rejection_reason';
import '../factories/permission';
import '../factories/user_profile';
import '../factories/timeslot';
import '../factories/gogovan_transport';
import '../factories/crossroads_transport';
import '../factories/message';
import '../factories/version';

export default function(testHelper) {
  config.APP.PRELOAD_TYPES.concat(config.APP.PRELOAD_AUTHORIZED_TYPES).forEach(function(type) {
    testHelper.handleFindAll(type, 0);
  });

  $.mockjax({url:"/api/v1/auth/current_user_profil*",
    responseText: {"user_profile": FactoryGuy.build("user_profile")} });

  //hide sync-data related mocks from console, but show test related mocks
  $.mockjaxSettings.logging = false;
  testHelper.container.lookup("router:main").one('didTransition', function() {
    $.mockjaxSettings.logging = true;
  });
}
