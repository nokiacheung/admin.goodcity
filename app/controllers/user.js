import Ember from 'ember';
const { getOwner } = Ember;

export default Ember.Controller.extend({
  user: Ember.computed.alias('model'),
  selectedId: null,

  permissions: Ember.computed(function(){
    return this.store.peekAll("permission").rejectBy("name", "System").sortBy('name');
  }),

  roles: Ember.computed(function(){
    return this.store.peekAll("role");
  }),

  userRoleIds: Ember.computed(function(){
    // return this.store.peekAll("userRole").filterBy("userId", this.get('user').id).mapBy('roleId');
    return [1,4,5];
  }),

  actions: {
    saveUser(){
      var user = this.get("model");
      var selectedId = this.get("selectedId");
      if(selectedId) {
        var loadingView = getOwner(this).lookup('component:loading').append();
        var permission = selectedId === "-1" ? null : this.store.peekRecord('permission', selectedId);
        user.set("permission", permission);
        user.save()
          .then(() => loadingView.destroy())
          .catch(error => {
            user.rollbackAttributes();
            loadingView.destroy();
            throw error;
          });
      }
    }
  }
});
