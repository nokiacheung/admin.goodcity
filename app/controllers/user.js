import Ember from 'ember';
const { getOwner } = Ember;

export default Ember.Controller.extend({
  user: Ember.computed.alias('model'),
  selectedRoleIds: [],

  permissions: Ember.computed(function(){
    return this.store.peekAll("permission").rejectBy("name", "System").sortBy('name');
  }),

  roles: Ember.computed(function(){
    return this.store.peekAll("role");
  }),

  actions: {
    setSelecteIds(id, isSelected) {
      if(isSelected){
        this.get('selectedRoleIds').pushObject(id);
      } else {
        this.get('selectedRoleIds').removeObject(id);
      }
    },

    saveUser(){
      var store = this.store;
      var user = this.get("model");
      var self = this;
      var loadingView = getOwner(this).lookup('component:loading').append();
      if(this.get('selectedRoleIds.length')){
        user.set('userRoleIds', this.get('selectedRoleIds'));
      } else {
        user.set('userRoleIds',[]);
      }
      user.save()
        .then(function(data){
          data.get('userRoles').toArray().forEach(userRole => {
            if(userRole && !data.get('userRoleIds').includes([userRole.get('roleId')].map(String))){
              store.unloadRecord(userRole);
            }
          });
          loadingView.destroy();
          self.transitionToRoute('users');
        })
        .catch(error => {
          user.rollbackAttributes();
          loadingView.destroy();
          throw error;
        });
    }
  }
});

