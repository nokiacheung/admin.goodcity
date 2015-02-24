// import Ember from 'ember';
// import config from './config/environment';
// import GoodcityRouter from 'goodcity/router'
// var Router = GoodcityRouter.extend({
//   location: config.locationType
// });

// // Router.map(function() {

// //   this.resource('offers', function () {

// //     this.resource('offer', { path: '/:offer_id'}, function() {
// //       this.route('donor_messages');
// //       this.route('supervisor_messages');

// //       this.resource('review_offer', function(){
// //         this.route('items');
// //         this.route('logistics');
// //         this.route('donor_details');
// //       });

// //       this.resource('review_item', {path: '/review_item/:item_id'},function() {
// //         this.route('index', { path: '/'});
// //         this.route('reject');
// //         this.route('accept');
// //         this.route('donor_messages');
// //         this.route('supervisor_messages');
// //       });
// //     });
// //   });

// //   this.resource('item_types');
// //   // this.route('messages');
// //   this.route('packages');

// //   this.resource('inbox', function(){
// //     this.route('index', {path: '/'});
// //     this.route('under_review');
// //     this.route('my_list');
// //     this.route('reviewed');
// //     this.route('scheduled');
// //     this.route('closed');
// //     this.route('received');
// //   });
// // });

// export default Router;

import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('tour');
  this.resource('i18n', { path: '/i18n' });
  this.resource('logout', { path: '/logout' });

  this.resource('offers', function () {
    this.route('index', { path: '/'});
    this.route('new', { path: '/new'});

    this.resource('offer', { path: '/:offer_id'}, function() {
      this.route('index', { path: '/'});
      this.route('confirm');
      this.route('submit');
      this.route('plan_delivery');
      this.route('collection_charges');
      this.route('gogovan_charges');

      this.route('messages');
      this.route('donor_messages');
      this.route('supervisor_messages');

      this.route('offer_details');
      this.route('transport_details');

      this.resource('delivery', { path: '/delivery/:delivery_id'}, function(){
        this.route('book_timeslot');
        this.route('available_time_slots');
        this.route('contact_details');
        this.route('thank_offer');

        this.route('book_van');
        this.route('confirm_van');
        this.route('porterage_charges');

        this.route('drop_off_schedule');
      });

      this.resource('item', {path: '/items/:item_id'}, function() {
        this.route('index', { path: '/'});
        this.route('edit');
        this.route('edit_images');
        this.route('messages');
      });

      this.resource('review_offer', function(){
        this.route('items');
        this.route('logistics');
        this.route('donor_details');
      });

      this.resource('review_item', {path: '/review_item/:item_id'},function() {
        this.route('index', { path: '/'});
        this.route('reject');
        this.route('accept');
        this.route('donor_messages');
        this.route('supervisor_messages');
      });
    });
  });

  this.resource('item_types');
  this.route('register');
  this.route('login');
  this.route('resend');
  this.route('authenticate');
  this.route('territories');
  this.route('districts');

  this.route('messages');
  this.route('packages');

  this.resource('inbox', function(){
    this.route('index', {path: '/'});
    this.route('under_review');
    this.route('my_list');
    this.route('reviewed');
    this.route('scheduled');
    this.route('closed');
    this.route('received');
  });
});

export default Router;