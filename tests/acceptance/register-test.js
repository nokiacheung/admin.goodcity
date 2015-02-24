import Ember from 'ember';
import startApp from '../helpers/start-app';
import userFactory from '../fixtures/user';
import territoryFactory from '../fixtures/territory';
import districtFactory from '../fixtures/district';

var App,
    testHelper,
    hk_user,
    territory,
    district;

var TestHelper = Ember.Object.createWithMixins(FactoryGuyTestMixin);

module('Acceptance: Register', {
  setup: function() {
    App = startApp();
    testHelper = TestHelper.setup(App);
    lookup('session:current').set('authToken', null);
    hk_user = FactoryGuy.build('with_hk_mobile');
  },
  teardown: function() {
    Ember.run(function () {
      testHelper.teardown();
    });
    Ember.run(App, 'destroy');
  }
});

test("All required registration details are filled", function() {
  expect(5);

  visit('/register');
  fillIn('#mobile', hk_user.mobile);
  triggerEvent('#mobile', 'blur');
  fillIn('#first_name',  hk_user.firstName );
  fillIn('#last_name', hk_user.lastName);
  click("#all");

  andThen(function() {
    var districtId = find('.district-selection option:contains("Tung Chung")').val();
    find('.district-selection select').val(districtId).change();
  });

  triggerEvent('#mobile', 'blur');

  andThen(function() {
    equal(find('#mobile').val(), hk_user.mobile);
    equal(find('#first_name').val(), hk_user.firstName);
    equal(find('#last_name').val(), hk_user.lastName);
    equal(find('.district-selection :selected').text(), "Tung Chung");
  });

  click("#registerUser");

  andThen(function(){
    equal(currentURL(), "/authenticate");
  });
});

test("cannot register unless mobile number details are entered", function() {
  expect(1);

  visit('/register');
  fillIn("#first_name",  hk_user.firstName );
  fillIn('#last_name', hk_user.lastName);

  andThen(function() {
    equal(currentURL(), '/register');
  });
});

test("mobile number length should be 8 digit (excluding country code)", function() {
  expect(1);

  visit('/register');
  fillIn('#mobile', hk_user.mobile);
  triggerEvent('#mobile', 'blur');
  fillIn("#first_name",  hk_user.firstName );
  fillIn('#last_name', hk_user.lastName);

  andThen(function() {
    equal(find('#mobile').val().length, 8);
  });
});
