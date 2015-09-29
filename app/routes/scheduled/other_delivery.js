import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render('my_list.reviewing', {controller: 'scheduled.other_delivery'});
  },

  setupController: function(controller, model){
    controller.set("model", model);
    controller.set("filterValue", null);
  }
});
