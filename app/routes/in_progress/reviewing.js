import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  renderTemplate() {
    this.render('my_list.reviewing', {controller: 'in_progress.reviewing'});
  },

  model() {
    return this.get("store").filter('offer', function(offer) {
      return offer.get('isUnderReview');
    });
  }
});
