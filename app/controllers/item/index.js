import Ember from "ember";

export default Ember.ObjectController.extend({

  actions: {
    removeItem: function(item) {
      var controller = this;

      if(confirm("Are you sure? This cannot be undone.")) {
        var loadingView = controller.container.lookup('view:loading').append();
        var offer = item.get('offer');
        offer.get('items').removeObject(item);

        item.destroyRecord().then(function(){
          loadingView.destroy();
          if(offer.get('itemCount') === 0) {
            controller.transitionToRoute("offer");
          } else {
            controller.transitionToRoute("offer.offer_details");
          }
        });
      }
    }
  }
});
