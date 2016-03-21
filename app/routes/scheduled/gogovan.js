import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render('my_list.reviewing', {controller: 'scheduled.gogovan'});
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set("filterValue", null);
  }
});
