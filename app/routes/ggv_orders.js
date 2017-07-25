import AjaxPromise from '../utils/ajax-promise';
import AuthorizeRoute from './authorize';

export default AuthorizeRoute.extend({
  model(params) {
    var _this = this;
    return new AjaxPromise("/gogovan_orders/driver_details", "GET", this.get('session.authToken'),
      {id: params.ggv_id})
      .then(function(data) {
        _this.store.pushPayload(data);
        return _this.store.peekRecord('offer', data.offer.id);
      });
  }
});
