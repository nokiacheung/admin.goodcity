import FactoryGuy from 'ember-data-factory-guy';
var types = ["Van", "5.5t Truck", "Disable"];

FactoryGuy.define('gogovan_transport', {
  default: {
    name: FactoryGuy.generate(function() {
      return types[Math.floor(Math.random()*(types.length))];
    }),
    disabled: false,
  }
});

export default {};
