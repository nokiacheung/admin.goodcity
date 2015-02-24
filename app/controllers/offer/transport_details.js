import Ember from 'ember';

var transportDetails =  Ember.ObjectController.extend({
  needs: ['offers/index'],
  delivery: Ember.computed.alias('model.delivery'),

  user: function(){
    var userId = this.session.get("currentUser.id");
    return this.store.getById('user_profile', userId);
  }.property().volatile(),

  userName: function(){
    return this.get('delivery.contact.name') || this.get("user.fullName");
  }.property('contact.name', 'user'),

  userMobile: function(){
    return this.get('delivery.contact.mobile') || this.get("user.mobile");
  }.property('contact.mobile', 'user'),

  district: function(){
    return this.get('delivery.contact.address.district.name') || this.get("user.address.district.name");
  }.property('user', 'delivery'),

  actions: {
    newOffer: function(){
      var offers = this.store.all('offer');
      this.get('controllers.offers/index').send('newOffer', offers);
    },

    handleBrokenImage: function() {
      this.get("reviewedBy").set("hasImage", null);
    }
  }
});

export default transportDetails;
