var types = ["1/8 Truck", "2/8 Truck", "8/8 Truck"];

FactoryGuy.define('crossroads_transport', {
  default: {
    name: FactoryGuy.generate(function(num) {
      return types[Math.floor(Math.random()*(types.length))];
    }),
    cost: 200,
  }
});

export default {};
