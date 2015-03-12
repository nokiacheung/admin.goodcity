import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({

  model: function() {
    return this.paramsFor('review_item').item_id;
  },

  renderTemplate: function() {
    this.render();
    this.render('packages', {
      into: 'review_item/accept',
      outlet: 'packages',
      controller: 'packages'
    });
  },
});
