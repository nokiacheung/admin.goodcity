var permission_list = ["Reviewer","Supervisor"];

FactoryGuy.define('permission',{
  sequences: {
    name: function() {
       return permission_list[Math.floor(Math.random() * permission_list.length)];
    }
  },
  default: null
});

export default {};
