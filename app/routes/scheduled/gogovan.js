import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate: function() {
    this.render('my_list.reviewing', {controller: 'scheduled.gogovan'});
  },

  setupController: function(controller, model){
    controller.set("model", model);
    controller.set("filterValue", null);
  }
});
