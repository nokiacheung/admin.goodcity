var reason_list = ["Quality", "Size","Supply/Demand"];

FactoryGuy.define('rejection_reason',{
  sequences: {
    name: function() {
       return reason_list[Math.floor(Math.random() * reason_list.length)];
    }
  },
  default: {
    name: FactoryGuy.generate("name")
  }
});

export default {};
