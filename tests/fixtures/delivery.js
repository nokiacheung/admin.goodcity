var conditions = ["Gogovan", "Drop Off", "Alternate"];

FactoryGuy.define('delivery', {
  default: {
    deliveryType: FactoryGuy.generate(function(num) {
      return conditions[num];
    }),
    contact: FactoryGuy.belongsTo("contact"),
    schedule: FactoryGuy.belongsTo("schedule"),
  }
});

export default {};
