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
        this.get('selectedRoleIds').push(id);
      } else {
        this.get('selectedRoleIds').pop(id);
      }
    },

    saveUser(){
      var user = this.get("model");
        var loadingView = getOwner(this).lookup('component:loading').append();
        if(this.get('selectedRoleIds.length')){
          user.set('userRoleIds', this.get('selectedRoleIds'));
        } else {
          user.set('userRoleIds',[]);
        }
        user.save()
          .then(() => loadingView.destroy())
          .catch(error => {
            user.rollbackAttributes();
            loadingView.destroy();
            throw error;
          });
      // }
    }
  }
});

