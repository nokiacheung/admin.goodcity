import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('role_permission',{
  sequences: {
    id: function(num) {
      return num + 100;
    },
    roleId: function(num) {
      return num + 500;
    },
    permissionId: function(num){
      return num + 500;
    }
  },
  default: {
    id:              FactoryGuy.generate('id'),
    roleId:       FactoryGuy.generate("roleId"),
    permissionId: FactoryGuy.generate("permissionId"),
    role:         FactoryGuy.belongsTo('role'),
    permission:        FactoryGuy.belongsTo('permission')
  }
});
export default {};
