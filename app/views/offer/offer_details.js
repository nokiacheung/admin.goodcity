import Ember from 'ember';
import '../../computed/local-storage';

export default Ember.View.extend({
  didInsertElement: function() {
    var _this = this;

    Ember.$(document).foundation({
      joyride : {
        modal: true,
        nub_position: 'top',
        tip_animation_fade_speed: 1300,
        tip_animation: 'fade',
        tip_location_patterns: {
          top: ['bottom'],
        },
        post_ride_callback: function(){
          _this.get("controller").set("joyrideSeen", true); }
      }
    }).foundation('joyride', 'start');
  },
});


