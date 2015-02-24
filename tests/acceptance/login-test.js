import Ember from 'ember';
import startApp from '../helpers/start-app';
import testSkip from '../helpers/test-skip';
import '../fixtures/user_profile';

var App, testHelper, hk_user, non_hk_user;

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Acceptance: Login', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);

    hk_user = FactoryGuy.build('with_hk_mobile');
    non_hk_user = FactoryGuy.build('with_non_hk_mobile');

    lookup("controller:subscriptions").pusher = {
      get: function() { return {}; },
      wire: function() {}
    };
  },
  teardown: function() {
    Ember.run(function () {
      testHelper.teardown();
    });
    Ember.run(App, 'destroy');
  }
});

test("User able to enter mobile number and get the sms code", function() {
  expect(1);

  logoutUser('/login');
  fillIn('#mobile', hk_user.mobile);
  triggerEvent('#mobile', 'blur');
  click("#getsmscode");

  andThen(function() {
    equal(currentURL(), "/authenticate");
  });
});

test("User is able to enter sms code and confirm and redirected to offers", function() {
  expect(2);

  var authToken = window.localStorage.authToken;
  logoutUser('/authenticate');
  visit('/authenticate');
  fillIn('#pin', "1234");
  triggerEvent('#pin', 'blur');

  andThen(function() {
    equal(find('#pin').val().length, 4);
    window.localStorage.authToken = authToken;
  });

  click("#submit_pin");

  andThen(function(){
    equal(currentURL(), "/offers");
  });
});

test("Logout clears authToken", function() {
  expect(1);

  visit("/offers");
  click("a:contains('Logout')");
  andThen(function() {
    equal(typeof window.localStorage.authToken, "undefined");
  });
});

test("User is able to resend the sms code", function() {
  expect(1);

  $.mockjax({url:"/api/v1/auth/send_pi*",responseText:{
    "otp_auth_key" : "/JqONEgEjrZefDV3ZIQsNA=="
  }});

  logoutUser('/authenticate');
  visit('/authenticate');

  click("#resend-pin");

  andThen(function() {
    equal(window.localStorage.otpAuthKey, '"/JqONEgEjrZefDV3ZIQsNA=="');
  });

});
