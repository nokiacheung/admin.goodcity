import Ember from 'ember';

export default Ember.Mixin.create({
  history: [],

  hasHistory: function(){
    return this.get('history.length') > 1;
  }.property('history.length'),

  actions: {
    togglePath: function(path){
      this.get('history').pushObject(this.get('currentPath'));

      if(this.get('target.currentPath') === path) {
        if(this.get('hasHistory')){
          this.get('history').popObject();
          window.history.back();
        } else {
          this.transitionToRoute("my_list");
        }
      } else {
        this.transitionToRoute(path);
      }
    }
  }
});
