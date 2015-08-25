import scheduleController from './collection';

export default scheduleController.extend({

  allScheduled: function(key, value){
    return (arguments.length > 1) ? value : this.get('ggv');
  }.property('ggv'),

});
