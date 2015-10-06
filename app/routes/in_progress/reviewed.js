import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render('my_list.reviewing', {controller: 'in_progress.reviewed'});
  },

  model() {
    return this.store.filter('offer', function(offer) {
      return offer.get('isReviewed');
    });
  }
});
