import config from './config/environment';
import GoodcityRouter from 'shared.goodcity/router/router';

var Router = GoodcityRouter.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('offer', { path: '/offers/:offer_id'}, function() {
    this.route('messages');
    this.route('donor_messages');
    this.route('supervisor_messages');

    this.resource('review_offer', function(){
      this.route('items');
      this.route('logistics');
      this.route('donor_details');
      this.route('receive');
      this.route('mark_received');
    });

    this.resource('review_item', {path: '/review_item/:item_id'},function() {
      this.route('index', { path: '/'});
      this.route('reject');
      this.route('accept');
      this.route('donor_messages');
      this.route('supervisor_messages');
    });

    this.resource('package', {path:'/package/:package_id'}, function() {
      this.route('edit_images');
    });

    this.resource('delivery', { path: '/delivery/:delivery_id'}, function(){
      this.route('cancel_booking');
    });
  });

  this.resource('item_types');
  this.route('packages');
  this.route('my_notifications');

  this.resource('offers', function(){
    this.route('submitted');

    this.resource('my_list', function(){
      this.route('reviewing');
      this.route('reviewed');
      this.route('scheduled');
      this.route('finished');
    });

    this.resource('in_progress', function(){
      this.route('reviewing');
      this.route('reviewed');
    });

    this.resource('finished', function(){
      this.route('received');
      this.route('canceled');
      this.route('expired');
    });

    this.resource('scheduled', function(){
      this.route('collection');
      this.route('gogovan');
      this.route('other_delivery');
    });
  });
});

export default Router;
