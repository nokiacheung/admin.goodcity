var types = ["Van", "5.5t Truck", "Disable"];

FactoryGuy.define('gogovan_transport', {
  default: {
    name: FactoryGuy.generate(function(num) {
      return types[Math.floor(Math.random()*(types.length))];
    })
  }
});

export default {};
