import Ember from 'ember';
import AjaxPromise from './../../utils/ajax-promise';
import transportDetails from './../offer/transport_details';
import config from './../../config/environment';
import { translationMacro as t } from "ember-i18n";
const { getOwner } = Ember;

export default transportDetails.extend({

  accepted: Ember.computed.filterBy('model.items', 'state', 'accepted'),
  pendingItem: Ember.computed.filterBy('model.items', 'state', 'submitted'),
  crossroadsOptionsPrompt: t("select"),
  i18n: Ember.inject.service(),
  selectedGogovanOption: "",

  selectedCrossroadsOption: Ember.computed('crossroadsOptions', function(){
    var options = this.get('crossroadsOptions').filter(option => {
      return option.get('name') === this.get("i18n").t("offer.disable").string;
    });
    return options.get('firstObject');
  }),

  defaultGogovanOption: Ember.computed('gogovanOptions', function(){
    var options = this.get('gogovanOptions').filter(option => {
      return option.get('name') === this.get("i18n").t("logistics.van").string;
    });
    return options.get('firstObject.id');
  }),

  gogovanOptions: Ember.computed(function(){
    var allOptions = this.store.peekAll('gogovan_transport');
    var options = allOptions.rejectBy('disabled', true).sortBy('id');
    var disabledOption = allOptions.filterBy('disabled', true);
    return options.concat(disabledOption);
  }),

  crossroadsOptions: Ember.computed(function(){
    return this.store.peekAll('crossroads_transport').sortBy('name');
  }),

  ggvDriverUrl: Ember.computed('model', function(){
    var language = this.get("session.language");
    var uuid = this.get("model.delivery.gogovanOrder.ggvUuid");
    var url = config.ADMIN_APP_HOST_URL+"/ggv_orders/"+uuid;
    var params = [];
    if(language) { params.push("ln="+language); }
    if(params.length) { url = url + "?" + params.join("&"); }
    return url;
  }),

  actions: {

    completeReview() {
      var gogovanOptionId = this.get('selectedGogovanOption');
      var crossroadsOptionId = this.get('selectedCrossroadsOption.id');
      var loadingView = getOwner(this).lookup('component:loading').append();
      var offerId = this.get('model.id');

      var offerProperties = {
        gogovan_transport_id: gogovanOptionId,
        crossroads_transport_id: crossroadsOptionId,
        state_event: 'finish_review',
        id: offerId
      };

      var url   = "/offers/" + offerId + "/complete_review";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), {offer: offerProperties})
        .then(data => {
          this.store.pushPayload(data);
        })
        .finally(() => loadingView.destroy());
    },
  }
});
