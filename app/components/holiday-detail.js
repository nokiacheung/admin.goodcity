import Ember from 'ember';
// import AjaxPromise from 'goodcity/utils/ajax-promise';
const { getOwner } = Ember;

export default Ember.Component.extend({

  i18n: Ember.inject.service(),
  messageBox: Ember.inject.service(),
  isEditing: false,
  selectedDate: Ember.computed.alias("day.holiday"),

  actions: {
    removeHoliday(holiday) {
      this.get("messageBox").confirm(this.get("i18n").t("edit_images.delete_confirm"), () => {
          var loadingView = getOwner(this).lookup('component:loading').append();

          holiday.deleteRecord();
          holiday.save()
            .catch(error => { holiday.rollback(); throw error; })
            .finally(() => loadingView.destroy());
        });
    },

    displayEditForm() {
      this.set('isEditing', true);
    },

    hideEditForm() {
      this.get('day').rollbackAttributes();
      this.set('isEditing', false);
    },

    saveHoliday() {
      var loadingView = getOwner(this).lookup('component:loading').append();
      var holiday = this.get("day");
      holiday.save()
        .catch(error => { holiday.rollback(); throw error; })
        .finally(() => {
          loadingView.destroy();
          this.set('isEditing', false);
        });
    },


  }

});
