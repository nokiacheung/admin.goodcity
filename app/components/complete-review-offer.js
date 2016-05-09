import Ember from 'ember';
import AjaxPromise from 'goodcity/utils/ajax-promise';
const { getOwner } = Ember;
import { translationMacro as t } from "ember-i18n";

export default Ember.Component.extend({

  store: Ember.inject.service(),
  i18n: Ember.inject.service(),
  invalidMessage: false,
  invalidSelection: false,

  selectedGogovanOption: "",
  ggvOptionPlaceholder: t("logistics.choose_ggv_option"),

  closeMessage: Ember.computed("offer", function(){
    return this.get("i18n").t("logistics.complete_review_message", { offer_id: this.get("offer.id") });
  }),

  gogovanOptions: Ember.computed(function(){
    var allOptions = this.get("store").peekAll('gogovan_transport');
    var options = allOptions.rejectBy('disabled', true).sortBy('id');
    var disabledOption = allOptions.filterBy('disabled', true);
    return options.concat(disabledOption);
  }),

  actions: {

    confirmCloseOffer() {
      this.set("displayUserPrompt", true);
    },

    completeReview() {
      var completeReviewMessage = this.get("closeMessage").string || this.get("closeMessage") || "";
      if(completeReviewMessage.trim().length === 0) {
        this.set("invalidMessage", true);
        return false;
      }
      this.set("invalidMessage", false);

      var gogovanOptionId = this.get('selectedGogovanOption.id');
      if(gogovanOptionId === undefined) {
        this.set("invalidSelection", true);
        return false;
      }
      this.set("invalidSelection", false);

      var loadingView = getOwner(this).lookup('component:loading').append();
      var offerId = this.get('offer.id');

      var offerProperties = {
        gogovan_transport_id: gogovanOptionId,
        state_event: 'finish_review',
        id: offerId
      };

      var url   = "/offers/" + offerId + "/complete_review";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), {offer: offerProperties, complete_review_message: completeReviewMessage})
        .then(data => {
          this.get("store").pushPayload(data);
        })
        .finally(() => loadingView.destroy());
    },
  },

});
