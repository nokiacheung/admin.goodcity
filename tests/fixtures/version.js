var event_list = ["create","update"];

FactoryGuy.define('version',{
  sequences: {
    event: function() {
       return event_list[Math.floor(Math.random() * event_list.length)];
    }
  },
  default: null
});

export default {};
